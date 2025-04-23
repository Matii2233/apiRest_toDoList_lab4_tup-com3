import { Backlog } from "../models/Backlog.js"
import { Task } from "../models/Task.js"

export const getBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.findOne()
        if (!backlog) return res.status(404).json({ message: 'El backlog no fue encontrado' })
        res.status(200).json(backlog)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const createBacklog = async (req, res) => {
    try {
        const backlogbd = await Backlog.findOne()
        if (backlogbd) return res.status(400).json({ message: 'El backlog ya está creado' })

        const { tasks } = req.body
        if (!tasks) return res.status(400).json({ message: 'El campo "tasks" es obligatorio' })

        const newBacklog = new Backlog({ tasks })
        await newBacklog.save()
        res.status(201).json(newBacklog)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const addTaskToBacklog = async (req, res) => {
    try {
        const backlog = res.backlog
        const task = await Task.findById(req.params.taskId)

        if (!task) return res.status(404).json({ message: "La tarea no fue encontrada" })
        if (backlog.tasks.includes(task._id)) return res.status(400).json({ message: "La tarea ya está en el backlog" })

        backlog.tasks.push(task)
        const updated = await backlog.save()
        res.status(200).json({ message: "La tarea se agregó correctamente", backlog: updated })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}