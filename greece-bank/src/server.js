import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)

app.listen(5000, () => console.log('Server running on port 5000'))
