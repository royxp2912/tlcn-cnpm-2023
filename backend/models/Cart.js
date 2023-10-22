import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "products", require: true, },
            image: { type: String, require: true, },
            name: { type: String, require: true, },
            color: { type: String, require: true, },
            size: { type: String, require: true, },
            quantity: { type: Number, require: true, },
            price: { type: Number, require: true, },
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
    },
    total: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
)

export default mongoose.model("Cart", CartSchema)