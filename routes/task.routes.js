import express from "express"
import {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/taskController.js"
import { taskMiddleware } from "../middlewares/taskMiddleware.js"

const router = express.Router()

router.get("/", getAllTasks)
router.post("/", createTask)
router.get("/:id", taskMiddleware, getTaskById)
router.put("/:id", taskMiddleware, updateTask)
router.delete("/:id", taskMiddleware, deleteTask)

export default router