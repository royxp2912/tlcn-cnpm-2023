import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    districts: {
        type: String,
        required: true,
    },
    wards: {
        type: String,
        required: true,
    },
    specific: {
        type: String,
        required: true,
    },
    default: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
)

export default mongoose.model("Address", AddressSchema)