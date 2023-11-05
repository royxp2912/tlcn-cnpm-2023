import Category from "../models/Category.js";
import { checkedNull } from "../utils/handel_null.js";
import { checkedObjectId } from "../utils/checkedOthers.js";

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

    updateName: async (cateID, name) => {
        try {
            checkedObjectId(cateID, "Category ID");

            const savedCate = await Category.findByIdAndUpdate(
                cateID,
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

    updateImage: async (cateID, image) => {
        try {
            checkedObjectId(cateID, "Category ID");

            const savedCate = await Category.findByIdAndUpdate(
                cateID,
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

    deleteById: async (cateID) => {
        try {
            checkedObjectId(cateID, "Category ID");

            const deletedCate = await Category.findByIdAndDelete(cateID);
            checkedNull(deletedCate, "Category doens't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Delete Successful!!!",
                data: deletedCate,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong in Category Service !!!",
            }
        }
    },

    getById: async (cateID) => {
        try {
            checkedObjectId(cateID, "Category ID");

            const getedCate = await Category.findById(cateID)
                .select("-createdAt -updatedAt -__v");
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

    getAll: async (pageSize, pageNumber) => {
        try {
            const listCate = await Category.find()
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .select("-createdAt -updatedAt -__v");
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