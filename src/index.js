import express from 'express';
import { PORT } from './db/config.js';
import notesRoutes from './routes/notes.routes.js';
import cors from 'cors'

const app = express()


app.use(express.json())
app.use(cors())
app.use(notesRoutes)

app.use((req, res) => {
    res.status(404).json({
        code: 404,
        message: 'Not Found'
    })
})

app.listen(PORT)
console.log("App hosteada en puerto 3000");