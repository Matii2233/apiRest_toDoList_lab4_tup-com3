import { Task } from "../models/Task.js";

export const taskMiddleware = async (req, res, next) => {
    let task;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ message: 'El ID de la tarea no es válido' })
    }

    try {
        task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({ message: 'La tarea no fue encontrada' })
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.task = task
    next()
}