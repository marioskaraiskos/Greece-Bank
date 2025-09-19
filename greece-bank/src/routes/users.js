import express from 'express'
import { pool } from '../db.js'
import bcrypt from 'bcrypt'

const router = express.Router()

// GET all users
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT id, username, email, created_at FROM users')
  res.json(rows)
})

// POST create new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    )
    res.json({ id: result.insertId, username, email })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id])
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
