// backend/routes/auth.js
import express from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// In-memory store for recovery tokens (⚠ only dev/testing; use DB for prod)
const recoveryTokens = new Map();

// -------------------- LOGIN --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(401).json({ error: "User not found" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    res.json({ message: "Login successful", user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// -------------------- REGISTER --------------------
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.json({ message: "User registered successfully", userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// -------------------- RECOVER PASSWORD --------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/recover", async (req, res) => {
  const { email } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(404).json({ error: "Email not found" });

    // Generate token and store temporarily
    const token = Math.random().toString(36).substring(2, 15);
    recoveryTokens.set(token, email);

    const recoverLink = `http://localhost:5173/reset-password?token=${token}&email=${email}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Recovery - Greece Bank",
      html: `<p>Click below to reset your password:</p>
             <a href="${recoverLink}">${recoverLink}</a>`,
    });

    res.json({ message: "Recovery email sent. Check your inbox." });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// -------------------- RESET PASSWORD --------------------
router.post("/reset-password", async (req, res) => {
  const { token, email, newPassword } = req.body;

  if (!recoveryTokens.has(token)) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  const storedEmail = recoveryTokens.get(token);
  if (storedEmail !== email) {
    return res.status(400).json({ error: "Token does not match email" });
  }

  try {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = ? WHERE email = ?", [hashedNewPassword, email]);

    recoveryTokens.delete(token); // remove token after use
    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
