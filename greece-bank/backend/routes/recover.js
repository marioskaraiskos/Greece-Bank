import express from 'express'
import { pool } from '../db.js'
import nodemailer from 'nodemailer'

const router = express.Router()

router.post('/', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email required' })

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
  const user = rows[0]

  if (!user) return res.status(400).json({ message: 'User not found' })

  // Send recovery email (example using nodemailer)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const info = await transporter.sendMail({
    from: `"Greece Bank" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Password Recovery",
    text: `Hello ${user.username}, click this link to reset your password: http://localhost:5173/reset-password`
  })

  res.json({ message: 'Recovery email sent!' })
})

export default router
