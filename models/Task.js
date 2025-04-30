import mongoose from "mongoose";

const Estados = ["Pendiente", "En proceso", "Completado", ""]

const TaskSchema = new mongoose.Schema(
    {
        titulo: String,
        descripcion: {
            type: String,
            required: false,
        },
        fechaLimite: String,
        estado: {
            type: String,
            enum: Estados,
            default: "Pendiente"
        },
    }
)

export const Task = mongoose.model("Task", TaskSchema)