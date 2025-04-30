import { Sprint } from "../models/Sprint.js"
import { Task } from "../models/Task.js"

export const getAllSprints = async (req, res) => {
    try {
        const sprints = await Sprint.find().populate("tareas")
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
    const { fechaInicio, fechaCierre, nombre, tareas } = req.body

    if (!fechaInicio || !fechaCierre || !nombre || !tareas) {
        return res.status(400).json({ message: 'Los campos "fechaInicio", "fechaCierre", "nombre" y "tareas" son obligatorios' })
    }

    try {
        const sprint = new Sprint({ fechaInicio, fechaCierre, nombre, tareas })
        const newSprint = await sprint.save()
        res.status(201).json({ newSprint })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const updateSprint = async (req, res) => {
    try {
        const sprint = res.sprint
        sprint.fechaInicio = req.body.fechaInicio || sprint.fechaInicio
        sprint.fechaCierre = req.body.fechaCierre || sprint.fechaCierre
        sprint.tareas = req.body.tareas || sprint.tareas
        sprint.nombre = req.body.nombre || sprint.nombre

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




// - - - - - - - - TAREAS EN EL SPRINT - - - - - - - -

// Traer las tareas del sprint
export const getAllTaskSprint = async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id)
        const tareasSprint = await sprint.populate('tareas')
        if (!tareasSprint) return res.status(404).json({ message: "Sprint no encontrado" })
        if (tareasSprint === 0) return res.status(204).json({ tareas: [] })
        res.status(200).json({ tareas: tareasSprint.tareas })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Crear una tarea dentro de un sprint
export const createTaskInSprint = async (req, res) => {
    const { id } = req.params;
    const { titulo, fechaLimite, descripcion, estado } = req.body;

    if (!titulo || !fechaLimite || !descripcion) {
        return res.status(400).json({ message: 'Los campos: "titulo", "fechaLimite", "descripcion" y "estado" son obligatorios' });
    }

    try {
        const sprint = await Sprint.findById(id).populate("tareas");
        if (!sprint) {
            return res.status(404).json({ message: 'Sprint no encontrado' });
        }

        const task = new Task({
            titulo,
            descripcion: descripcion || "",
            fechaLimite,
            estado
        });

        const newTask = await task.save();
        sprint.tareas.push(newTask);
        const updatedSprint = await sprint.save();
        res.status(201).json({
            message: "Tarea creada y agregada al sprint correctamente",
            sprint: updatedSprint,
            task: newTask
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTaskSprint = async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id).populate("tareas")
        const tarea = sprint.tareas.find(t => t._id.toString() === req.params.taskId)
        if (!sprint) return res.status(404).json({ message: "Sprint no encontrado" })
        if (!tarea) return res.status(404).json({ message: "Tarea no encontrado" })

        tarea.fechaLimite = req.body.fechaLimite || tarea.fechaLimite;
        tarea.descripcion = req.body.descripcion || tarea.descripcion;
        tarea.estado = req.body.estado || tarea.estado;
        tarea.titulo = req.body.titulo || tarea.titulo;

        await tarea.save()
        await sprint.save()
        res.status(200).json({ message: "Tarea actualizada correctamente en el sprint", sprint: sprint })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const addTaskToSprint = async (req, res) => {
    try {
        const sprint = res.sprint
        const task = await Task.findById(req.params.taskId)

        if (!task) return res.status(404).json({ message: "La tarea no fue encontrada" })
        if (sprint.tareas.includes(task._id)) return res.status(400).json({ message: "La tarea ya está en el sprint" })

        sprint.tareas.push(task)
        const updated = await sprint.save()
        res.status(200).json({ message: "La tarea se agregó correctamente", sprint: updated })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteTaskSprint = async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id).populate("tareas")
        const { taskId } = req.params
        const tarea = sprint.tareas.find(t => t._id.toString() === taskId)
        
        if (!sprint) return res.status(404).json({ message: "Sprint no encontrado" })
        if (!tarea) {
            return res.status(404).json({ message: "La tarea no existe en este sprint" })
        }
        if (sprint.tareas === undefined) {
            return res.status(204).json({ message: "El sprint está vacío" })
        }

        sprint.tareas = sprint.tareas.filter(t => t._id.toString() !== taskId)
        const updatedSprint = await sprint.save()
        res.status(200).json({ message: "La tarea fue eliminada del sprint correctamente", updatedSprint })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}