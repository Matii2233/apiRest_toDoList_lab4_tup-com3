import mongoose from "mongoose";

const SprintSchema = new mongoose.Schema(
    {
        nombre: String,
        fechaInicio: String,
        fechaCierre: String,
        tareas: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        ]
    }
)

export const Sprint = mongoose.model("Sprint", SprintSchema)