import express from 'express';
import notesRoutes from './routes/notes.routes.js';
import basicRoutes from './routes/basicRoutes.routes.js';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors'
import helmet from 'helmet';

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use('/notes', notesRoutes)
app.use('/users', usersRoutes)
app.use('/auth', authRoutes)
app.use(basicRoutes)

export default app