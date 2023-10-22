import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    listTokens: [
        {
            value: { type: String, require: true },
            status: { type: String, enum: ['Available', 'Locked'], require: true, default: "Available" },
        }
    ],
},
    { timestamps: true }
)

export default mongoose.model("Auth", AuthSchema)