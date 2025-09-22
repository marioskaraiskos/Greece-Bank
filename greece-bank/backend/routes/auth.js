import express from "express";
import { pool } from "../db.js";   // your MySQL pool
import bcrypt from "bcryptjs";

const router = express.Router();

// -------------------- LOGIN --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = rows[0];

    // 2a. Plain text password (current table setup)
    if (user.password === password) {
      return res.json({ message: "Login successful", user: { id: user.id, email: user.email } });
    }

    // 2b. If hashed passwords are used in future
    // const match = await bcrypt.compare(password, user.password);
    // if (!match) return res.status(401).json({ error: "Invalid password" });

    // 3. If password doesn’t match
    return res.status(401).json({ error: "Invalid password" });

  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// -------------------- REGISTER --------------------
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email already exists
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // 2a. Plain text password insertion (current table setup)
    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );

    // 2b. Optional: hashed password (future secure approach)
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const [result] = await pool.query(
    //   "INSERT INTO users (email, password) VALUES (?, ?)",
    //   [email, hashedPassword]
    // );

    res.json({ message: "User registered successfully", userId: result.insertId });

  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
