import Cart from "../models/Cart.js"

export const createCart = async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).send({
            success: true,
            message: "Tạo Cart Mới Thành Công!",
            data: savedCart
        });
    } catch (err) {
        res.status(404).json(err);
    }
}