import { Backlog } from "../models/Backlog.js"
import { Task } from "../models/Task.js"

export const getBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.findOne().populate('tareas')
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

        const { tareas } = req.body
        if (!tareas) return res.status(400).json({ message: 'El campo "tasks" es obligatorio' })

        const newBacklog = new Backlog({ tareas })
        await newBacklog.save()
        res.status(201).json(newBacklog)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const deleteBacklogTask = async (req, res) => {
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



// - - - - - - - TAREAS EN EL BACKLOG - - - - - - -

export const createTaskBacklog = async (req, res) => {
    const { titulo, fechaLimite, descripcion, estado } = req.body;

    if (!titulo || !fechaLimite || !descripcion || !estado) {
        return res.status(400).json({ message: 'Los campos "titulo", "estado", "fechaLimite" y "descripcion" son obligatorios' });
    }

    try {
        const backlog = await Backlog.findOne();
        if (!backlog) {
            return res.status(404).json({ message: 'Backlog no encontrado' });
        }

        const task = new Task({
            titulo,
            descripcion,
            fechaLimite,
            estado
        });

        const newTask = await task.save();
        backlog.tareas.push(newTask);
        const updatedBakclog = await backlog.save();
        res.status(201).json({
            message: "Tarea creada y agregada al backlog correctamente",
            backlog: updatedBakclog,
            task: newTask
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllTasksBacklog = async (req, res) => {
    try {
        const backlogTareas = await Backlog.findOne().populate("tareas")
        if (!backlogTareas) return res.status(404).json({ message: "Backlog no encontrado" })

        res.status(200).json({ tareas: backlogTareas.tareas })
    } catch (err) {
        res.status(500).json({ message: err.message})
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

export const updateTaskBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.findOne().populate("tareas")
        if (!backlog) return res.status(404).json({ message: 'backlog no encontrada' })

        const tarea = backlog.tareas.find(t => t._id.toString() === req.params.idTask);
        if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' })

        tarea.fechaLimite = req.body.fechaLimite || tarea.fechaLimite;
        tarea.descripcion = req.body.descripcion || tarea.descripcion;
        tarea.estado = req.body.estado || tarea.estado;
        tarea.titulo = req.body.titulo || tarea.titulo;
        
        await tarea.save()
        res.status(200).json({
            message: "Tarea actualizada correctamente",
            tareaEditada: tarea
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const deleteTaskBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.findOne().populate("tareas")
        const idTask = req.params.idTask
        const tareaEncontrada = backlog.tareas.find(t => t._id !== idTask)

        if (!backlog) return res.status(404).json({ message: "Backlog no encontrado" })
        if (!tareaEncontrada) return res.status(404).json({ message: "La tarea no existe en este backlog" })
        if (backlog.tareas === undefined) {
            return res.status(204).json({ message: "El backlog está vacío" })
        }

        backlog.tareas = backlog.tareas.filter(tarea => tarea._id.toString() !== idTask)
        const updatedBacklog = await backlog.save()
        res.status(200).json({ message: "La tarea fue eliminada del backlog correctamente", updatedBacklog })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}