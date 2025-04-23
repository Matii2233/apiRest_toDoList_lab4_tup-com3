import mongoose from "mongoose";

const Estados = ["Pendiente", "En proceso", "Completado", ""]

const TaskSchema = new mongoose.Schema(
    {
        title: String,
        description: {
            type: String,
            required: false,
        },
        limitDate: String,
        estado: {
            type: String,
            enum: Estados,
        },
        color: String
    }
)

export const Task = mongoose.model("Task", TaskSchema)