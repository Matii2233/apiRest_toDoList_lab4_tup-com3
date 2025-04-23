import mongoose from "mongoose";

const BaklogSchema = new mongoose.Schema(
    {
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        ]
    }
)

export const Backlog = mongoose.model("Backlog", BaklogSchema)