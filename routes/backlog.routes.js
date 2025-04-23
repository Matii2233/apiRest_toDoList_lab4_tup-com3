import express from "express"
import { getBacklog, createBacklog, addTaskToBacklog } from "../controllers/backlogController.js"
import { backlogMiddleware } from "../middlewares/backlogMiddleware.js"

const router = express.Router()

// OBTENER EL BACLOG
router.get("/", getBacklog)

// CREAR EL BACKLOG
router.post("/", createBacklog)

// CREAR UNA TAREA EN EL BACKLOG
router.put("/:id/add-task/:taskId", backlogMiddleware, addTaskToBacklog)

export default router