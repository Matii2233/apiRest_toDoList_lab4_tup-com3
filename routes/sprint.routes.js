import express from "express"
import { getAllSprints, updateSprint, getSprintById, deleteSprint, createSprint, addTaskToSprint } from "../controllers/sprintController.js";
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

// AGREGAR UNA TAREA A UN SPRINT
router.put("/:id/add-task/:taskId", sprintMiddleware, addTaskToSprint)

export default router