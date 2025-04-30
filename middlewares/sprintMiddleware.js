import { Sprint } from "../models/Sprint.js";

export const sprintMiddleware = async (req, res, next) => {
    let sprint;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ message: 'El ID del sprint no es válido' })
    }

    try {
        sprint = await Sprint.findById(id)
        if (!sprint) {
            return res.status(404).json({ message: 'El sprint no fue encontrada' })
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.sprint = sprint
    next()
}