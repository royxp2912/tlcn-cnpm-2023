import Order from "../models/Order.js"

export const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).send({
            success: true,
            message: "Tạo Order Mới Thành Công!",
            data: savedOrder
        });
    } catch (err) {
        res.status(404).json(err);
    }
}