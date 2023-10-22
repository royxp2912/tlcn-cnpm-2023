import Address from "../models/Address.js"

export const createAddress = async (req, res) => {
    const newAddress = new Address(req.body);

    try {
        const savedAddress = await newAddress.save();
        res.status(200).send({
            success: true,
            message: "Tạo Address Mới Thành Công!",
            data: savedAddress
        });
    } catch (err) {
        res.status(404).json(err);
    }
}