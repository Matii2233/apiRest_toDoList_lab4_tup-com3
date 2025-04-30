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
    const { titulo, fechaLimite, descripcion, estado } = req.body

    if (!titulo || !fechaLimite || !descripcion || estado !== "") {
        return res.status(400).json({message: 'Los campos: "titulo", "fechaLimite", "descripcion" y "estado" son obligatorios, y estado debe enviarse vacío'})
    }

    const task = new Task({
        titulo,
        descripcion: descripcion || "",
        fechaLimite,
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
        task.titulo = req.body.titulo || task.titulo
        task.descripcion = req.body.descripcion || task.descripcion
        task.fechaLimite = req.body.fechaLimite || task.fechaLimite
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
            const taskFound = sprint.tareas.find(tarea => tarea._id.toString() === req.params.id)
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