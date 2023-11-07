import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', require: true },
                image: { type: String, require: true },
                name: { type: String, require: true },
                color: { type: String, require: true },
                size: { type: String, require: true },
                quantity: { type: Number, require: true },
                price: { type: Number, require: true },
            },
        ],
        deliveryAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        total: {
            type: Number,
            default: 0,
        },
        paymentMethod: {
            type: String,
            enum: ['COD', 'VNPay'],
            default: 'COD',
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['Confirming', 'Waiting', 'Delivering', 'Successful', 'Cancel', 'Return'],
            default: 'Confirming',
        },
    },
    { timestamps: true },
);

export default mongoose.model('Order', OrderSchema);
