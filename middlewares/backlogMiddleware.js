export const backlogMiddleware = async (req, res, next) => {
    let backlog;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ message: 'El ID del backlog no es válido' })
    }

    try {
        backlog = await Backlog.findById(id)
        if (!backlog) {
            return res.status(404).json({ message: 'El Backlog no fue encontrado' })
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.backlog = backlog
    next()
}