import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    birthDay: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dtfei3453/image/upload/v1683022384/uploads/avatar_k0ohjl.webp",
    },
    role: {
        type: String,
        enum: ["User", "Admin", "Merchandiser"],
        required: true,
        default: "User",
    },
    status: {
        type: String,
        enum: ["Locked", "Available"],
        required: true,
        default: "Available",
    },
},
    { timestamps: true }
)

export default mongoose.model("User", UserSchema)