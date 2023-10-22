import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
},
    { timestamps: true }
)

export default mongoose.model("Variant", VariantSchema)