import express from 'express';
import { PORT } from './db/config.js';
import notesRoutes from './routes/notes.routes.js';
import basicRoutes from './routes/basicRoutes.routes.js';
import usersRoutes from './routes/users.routes.js';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use(notesRoutes)
app.use(usersRoutes)
app.use(basicRoutes)


app.listen(PORT)
console.log("App hosteada en puerto 3000");