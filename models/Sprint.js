import mongoose from "mongoose";

const SprintSchema = new mongoose.Schema(
    {
        startDate: String,
        endDate: String,
        color: String,
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        ]
    }
)

export const Sprint = mongoose.model("Sprint", SprintSchema)