import Cart from "../models/Cart.js";
import { checkedObjectId } from "../utils/checkedOthers.js";
import { checkedNull } from "../utils/handel_null.js";
import { getUserByID } from "./user.service.js";

export const {
    create,
    addToCart,
    calcTotal,
    getByUserID,
    removeFromCart,
} = {

    getByUserID: async (userID) => {
        try {
            checkedObjectId(userID, "User ID");

            const result = await Cart.findOne({ user: userID })
                .select("-createdAt -updatedAt -__v");
            checkedNull(result, "Cart don't exist !!!");

            return {
                success: true,
                status: 201,
                message: "Get Cart Of User Successful!!!",
                data: result,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Cart !!!",
            }
        }
    },

    removeFromCart: async (userID, proID) => {
        try {
            checkedObjectId(userID, "User ID");
            checkedObjectId(proID, "Product ID");

            const existProduct = await Cart.findOne({
                user: userID,
                "items.product": proID,
            })
            checkedNull(existProduct, "The product does not exist in the shopping cart !!!");

            const result = await Cart.findOneAndUpdate(
                { user: userID },
                {
                    $pull: { items: { product: proID } }
                },
                { new: true }
            );
            await calcTotal(result._id);

            return {
                success: true,
                status: 200,
                message: "Remove Item From Cart Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Cart !!!",
            }
        }
    },

    addToCart: async (body) => {
        try {
            const { user, ...others } = body;
            const existCart = await Cart.findOne({ user: user });
            checkedNull(existCart, "Cart don't exist !!!");

            const isExist = existCart.items.filter((item) => item.product.toString() === others.product);

            if (isExist.length !== 0) {
                await Cart.findOneAndUpdate(
                    {
                        user: user,
                        items: { $elemMatch: { product: others.product } },
                    },
                    {
                        $set: { "items.$": others },
                    },
                    { new: true },
                )
            } else {
                await Cart.findByIdAndUpdate(
                    existCart._id,
                    {
                        $push: { items: others },
                    },
                    { new: true },
                )
            }

            // tinh toan lai total xog khi add item to cart
            await calcTotal(existCart._id);

            return {
                success: true,
                status: 201,
                message: "Add Item To Cart Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Cart !!!",
            }
        }
    },

    calcTotal: async (cartID) => {
        try {
            checkedObjectId(cartID, "Cart ID");

            const result = await Cart.findById(cartID);
            checkedNull(result, "Cart don't exist !!!");

            const total = result.items.reduce((arc, item) => arc + item.price * item.quantity, 0);
            await Cart.findByIdAndUpdate(
                cartID,
                { $set: { total: total } },
            )

            return {
                success: true,
                status: 201,
                message: "Caculator Total Cart Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Cart !!!",
            }
        }
    },

    create: async (userID) => {
        try {
            checkedObjectId(userID, "User ID");
            // const existUser = await getUserByID(userID);
            // if (!existUser.success) return existUser;

            const newCart = new Cart({ user: userID });
            await newCart.save();

            return {
                success: true,
                status: 201,
                message: "Create New Cart Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Cart !!!",
            }
        }
    },
}