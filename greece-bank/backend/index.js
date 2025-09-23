import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './db.js'
import bcrypt from 'bcryptjs';
import usersRouter from './routes/users.js'
// import recoverRouter from './routes/recover.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())             // allow frontend requests
app.use(express.json())     // parse JSON bodies
app.use('/api/auth', authRoutes)


// Routes
app.use('/api/users', usersRouter)       // register, get users, delete users
// app.use('/api/recover-password', recoverRouter) // recover password

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!')
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
