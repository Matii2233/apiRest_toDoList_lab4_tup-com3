import { Sprint } from "../models/Sprint.js"
import { Task } from "../models/Task.js"

export const getAllSprints = async (req, res) => {
    try {
        const sprints = await Sprint.find()
        if (sprints.length === 0) return res.status(204).json([])
        res.status(200).json(sprints)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getSprintById = async (req, res) => {
    res.json(res.sprint)
}

export const createSprint = async (req, res) => {
    const { startDate, endDate, color, tasks } = req.body

    if (!startDate || !endDate || !color || !tasks) {
        return res.status(400).json({ message: 'Los campos "startDate", "endDate", "color" y "tasks" son obligatorios' })
    }

    try {
        const sprint = new Sprint({ startDate, endDate, color, tasks })
        const newSprint = await sprint.save()
        res.status(201).json({ newSprint })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const updateSprint = async (req, res) => {
    try {
        const sprint = res.sprint
        sprint.startDate = req.body.startDate || sprint.startDate
        sprint.endDate = req.body.endDate || sprint.endDate
        sprint.tasks = req.body.tasks || sprint.tasks
        sprint.color = req.body.color || sprint.color

        const updated = await sprint.save()
        res.json(updated)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const deleteSprint = async (req, res) => {
    try {
        await res.sprint.deleteOne()
        res.json({ message: 'El sprint fue borrado correctamente', sprint: res.sprint })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const addTaskToSprint = async (req, res) => {
    try {
        const sprint = res.sprint
        const task = await Task.findById(req.params.taskId)

        if (!task) return res.status(404).json({ message: "La tarea no fue encontrada" })
        if (sprint.tasks.includes(task._id)) return res.status(400).json({ message: "La tarea ya está en el sprint" })

        sprint.tasks.push(task)
        const updated = await sprint.save()
        res.status(200).json({ message: "La tarea se agregó correctamente", sprint: updated })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}