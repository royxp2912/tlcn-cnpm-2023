import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    commentator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    content: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
)

export default mongoose.model("Comment", CommentSchema)