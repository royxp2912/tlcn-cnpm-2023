import Category from "../models/Category.js";
import { checkedNull } from "../utils/handel_null.js";

export const {
    getAll,
    create,
    getById,
    deleteById,
    updateName,
    updateImage,
} = {
    create: async (body, image) => {
        try {
            const newCate = new Category({ ...body, image });
            const savedCate = await newCate.save();
            return {
                success: true,
                status: 201,
                message: "Create Successful!!!",
                data: savedCate,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    updateName: async (id, name) => {
        try {
            const savedCate = await Category.findByIdAndUpdate(
                id,
                { $set: { name: name } },
                { new: true }
            );
            return {
                success: true,
                status: 200,
                message: "Update Name Successful!!!",
                data: savedCate,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    updateImage: async (id, image) => {
        try {
            const savedCate = await Category.findByIdAndUpdate(
                id,
                { $set: { image: image } },
            );
            return {
                success: true,
                status: 200,
                message: "Update Image Successful!!!",
                data: savedCate,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    deleteById: async (id) => {
        try {
            const deletedCate = await Category.findByIdAndDelete(id);
            return {
                success: true,
                status: 200,
                message: "Delete Successful!!!",
                data: checkedNull(deletedCate),
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message,
            }
        }
    },

    getById: async (id) => {
        try {
            const getedCate = await Category.findById(id);
            return {
                success: true,
                status: 200,
                message: "Get Category By Id Successful!!!",
                data: checkedNull(getedCate),
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
            const listCate = await Category.find();
            return {
                success: true,
                status: 200,
                message: "Get All Category Successful!!!",
                data: listCate,
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