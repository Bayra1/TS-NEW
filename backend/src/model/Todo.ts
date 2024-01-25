import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"]
    },
    Label: String
});

const TodoModel = mongoose.model('Todo', TodoSchema)

export { TodoModel }