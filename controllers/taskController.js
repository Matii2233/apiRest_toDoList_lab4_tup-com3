import { Task } from "../models/Task.js"
import { Sprint } from "../models/Sprint.js"

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        if (tasks.length === 0) return res.status(204).json([])
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Crear una tarea
export const createTask = async (req, res) => {
    const { title, limitDate, color, estado, description } = req.body

    if (!title || !limitDate || !color || estado !== "") {
        return res.status(400).json({message: 'Los campos: "title", "limitDate" y "color" son obligatorios, y estado debe enviarse vacío'})
    }

    const task = new Task({
        title,
        description: description || "",
        limitDate,
        color,
        estado
    })

    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Obtener una tarea por ID
export const getTaskById = (req, res) => {
    res.json(res.task)
}

// Actualizar tarea
export const updateTask = async (req, res) => {
    try {
        const task = res.task
        task.title = req.body.title || task.title
        task.description = req.body.description || task.description
        task.limitDate = req.body.limitDate || task.limitDate
        task.color = req.body.color || task.color
        task.estado = req.body.estado || task.estado

        const updatedTask = await task.save()
        res.json(updatedTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// Eliminar tarea
export const deleteTask = async (req, res) => {
    try {
        const sprints = await Sprint.find()
        for (const sprint of sprints) {
            const taskFound = sprint.tasks.find(task => task._id.toString() === req.params.id)
            if (taskFound) {
                return res.status(400).json({ message: `La tarea aún existe en el sprint con ID: ${sprint._id}` })
            }
        }

        await res.task.deleteOne()
        res.json({ message: 'La tarea fue borrada correctamente', task: res.task })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}