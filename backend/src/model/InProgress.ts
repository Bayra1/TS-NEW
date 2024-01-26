import mongoose from "mongoose";

const InProgressSchema = new mongoose.Schema({
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
    status:{
        type: String,
        enum: ["Todo", "InProgress", "Over"],
        default: "Todo"
    },
    Label: String
});

const InProgressModal = mongoose.model('InProgress', InProgressSchema)

export { InProgressModal }