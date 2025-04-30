import express from "express"
import { getBacklog,
    createBacklog,
    addTaskToBacklog,
    createTaskBacklog,
    updateTaskBacklog,
    deleteTaskBacklog,
    getAllTasksBacklog } from "../controllers/backlogController.js"
import { backlogMiddleware } from "../middlewares/backlogMiddleware.js"

const router = express.Router()

// OBTENER EL BACLOG
router.get("/", getBacklog)

// CREAR EL BACKLOG
router.post("/", createBacklog)

// TRAER UNA TAREA AL BACKLOG
router.put("/:id", backlogMiddleware, addTaskToBacklog)

// TRAER TODAS LAS TAREAS DEL BACKLOG
router.get("/tasks", getAllTasksBacklog)

// CREAR TAREA EN EL BACKLOG
router.post("/create-task", createTaskBacklog)

// ACTUALIZAR TAREA EN EL BACKLOG
router.put("/:idTask/update-task", updateTaskBacklog)

// ELIMINAR TAREA EN EL BACKLOG
router.delete("/:idTask/delete-task", deleteTaskBacklog)


export default router