import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
            // require: true,
        }
    ],
    brand: {
        type: String,
        enum: ['Adidas', 'Nike', 'Vans', 'Balenciaga', 'Converse', 'Puma'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    sold: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["Locked", "Available", "Hide"],
        required: true,
        default: "Available",
    },
},
    { timestamps: true }
)

export default mongoose.model("Product", ProductSchema)