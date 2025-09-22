import express from 'express'
const router = express.Router()

router.get('/me', (req, res) => {
  res.json({ message: 'User profile endpoint works' })
})

export default router
