import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import { config } from "dotenv"
import taskRoutes from "./routes/task.routes.js"
import sprintRoutes from "./routes/sprint.routes.js"
import backlogRoutes from "./routes/backlog.routes.js"

config()

const app = express()
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
const db = mongoose.connection

app.use('/tareas', taskRoutes)
app.use('/sprints', sprintRoutes)
app.use('/backlog', backlogRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto: ${port}`)
})