import express from 'express';
import { pool } from '../db.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    res.json({ id: result.insertId, username, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];

  if (!user) return res.status(400).json({ error: 'User not found' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

  res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
});

// RECOVER PASSWORD (dummy)
router.post('/recover', async (req, res) => {
  const { email } = req.body;
  // Here you could use nodemailer to send a real recovery email
  res.json({ message: `Recovery email sent to ${email}` });
});

export default router;
