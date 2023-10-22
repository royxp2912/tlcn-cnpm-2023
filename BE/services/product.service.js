import Product from "../models/Product.js";
import { checkedNull, checkedNullAndFormatData } from "../utils/handel_null.js";
import { deleteAllByProID } from "./comment.service.js";
import {
    createList,
    getListVarByProID,
    deleteListVarByProID,
} from "./variant.service.js";

export const {
    create,
    getAll,
    update,
    getById,
    deleteById,
    getAllByCateID,
} = {

    update: async (proID, body) => {
        try {
            const savedProduct = await Product.findByIdAndUpdate(
                proID,
                { $set: body },
                { new: true }
            );
            return {
                success: true,
                status: 200,
                message: "Update Product Successful!!!",
                data: checkedNullAndFormatData(savedProduct),
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    deleteById: async (proID) => {
        try {
            const result = await Product.findByIdAndDelete(proID);
            checkedNull(result, "Product doesn't exist !!!");

            const deletedVariants = await deleteListVarByProID(proID);
            if (!deletedVariants.success) return deletedVariants;

            const deletedComments = await deleteAllByProID(proID);
            if (!deletedComments.success) return deletedComments;

            return {
                success: true,
                status: 200,
                message: "Delete Product Successful!!!",
                data: result,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    create: async (body, images) => {
        try {
            const { variants, ...others } = body;
            const listVariant = JSON.parse(variants);

            const newProduct = new Product({ ...others, images });
            const savedProduct = await newProduct.save();

            // create variant of Product
            const { success, status, message } = await createList(savedProduct._id, listVariant);
            if (!success) {
                // nếu create variants faild thì callback lại create product
                await Product.findByIdAndDelete(savedProduct._id);

                return {
                    success: false,
                    status: status,
                    message: message,
                }
            }

            return {
                success: true,
                status: 200,
                message: "Create New Product Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    getById: async (proID) => {
        try {
            const result = await Product.findById(proID)
                .populate({ path: 'category', select: 'name' })
                .select("-createdAt -updatedAt -__v");

            // Lấy variants thuộc product
            const { success, status, message, data } = await getListVarByProID(proID);
            if (!success) return { success, status, message };

            // lấy các thông tin cần thiết của variant
            const variants = data.map((item) => {
                const { product, createdAt, updatedAt, __v, ...others } = item._doc;
                return others;
            })
            checkedNull(result, "Product doesn't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Get Product By Id Successful!!!",
                data: {
                    product: result,
                    variants,
                },
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    getAll: async () => {
        try {
            const listProduct = await Product.find()
                .populate({ path: 'category', select: 'name' })
                .select("-createdAt -updatedAt -__v");
            return {
                success: true,
                status: 200,
                message: "Get All Product Successful!!!",
                data: checkedNull(listProduct, "Resource doesn't exist !!!"),
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    getAllByCateID: async (cateID) => {
        try {
            const listProduct = await Product.find({ category: cateID }).select({
                _id: 1, name: 1, brand: 1, price: 1, rating: 1, sold: 1
            });
            return {
                success: true,
                status: 200,
                message: "Get All Product Of Category Successful!!!",
                data: checkedNull(listProduct, "Resource doesn't exist !!!"),
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },
}