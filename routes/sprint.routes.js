import express from "express"
import { getAllSprints, updateSprint, getSprintById, deleteSprint, createSprint, addTaskToSprint, deleteTaskSprint, createTaskInSprint, getAllTaskSprint, updateTaskSprint } from "../controllers/sprintController.js";
import { sprintMiddleware } from "../middlewares/sprintMiddleware.js"

const router = express.Router()

// OBTENER LOS SPRINTS
router.get("/", getAllSprints)

// CREAR UN SPRINT
router.post("/", createSprint)

// ACTUALIZAR UN SPRINT POR ID
router.put("/:id", sprintMiddleware, updateSprint)

// ELIMINAR UN SPRINT POR ID
router.delete("/:id", sprintMiddleware, deleteSprint)



// TRAER LAS TAREAS DEL SPRINT
router.get("/:id/tasks", getAllTaskSprint)

// CREAR UNA TAREA EN EL SPRINT
router.post("/:id/create-task", sprintMiddleware, createTaskInSprint)

// ACTUALIZAR UNA TAREA DEL SPRINT
router.put("/:id/update-task/:taskId", sprintMiddleware, updateTaskSprint)

// AGREGAR UNA TAREA A UN SPRINT
router.put("/:id/add-task/:taskId", sprintMiddleware, addTaskToSprint)

// ELIMINAR UNA TAREA DE UN SPRINT
router.delete("/:id/delete-task/:taskId", sprintMiddleware, deleteTaskSprint)

export default router