import User from "../models/User.js";
import Product from "../models/Product.js";
import Comment from "../models/Comment.js";
import { checkedNull } from "../utils/handel_null.js";
import { checkedObjectId } from "../utils/checkedOthers.js";

export const {
    create,
    update,
    deleteAll,
    updateLike,
    deleteByID,
    getByCmtID,
    getAllByProID,
    getAllByUserID,
    deleteAllByProID,
    deleteAllByUserID,
    updateRatingOfProduct
} = {

    update: async (body) => {
        try {
            const { comment, ...others } = body;
            const updatedComment = await Comment.findByIdAndUpdate(
                comment,
                { $set: others },
                { new: true },
            );
            checkedNull(updatedComment, "Comment don't exist !!!");

            await updateRatingOfProduct(updatedComment.product);

            return {
                success: true,
                status: 200,
                message: "Update Like Comment Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    updateLike: async (cmtID) => {
        try {
            checkedObjectId(cmtID, "Comment ID");

            const updatedComment = await Comment.findByIdAndUpdate(
                cmtID,
                { $inc: { like: 1 } },
            );
            checkedNull(updatedComment, "Comment don't exist !!!");

            return {
                success: true,
                status: 200,
                message: "Update Like Comment Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    getAllByUserID: async (userID, pageSize, pageNumber) => {
        try {
            checkedObjectId(userID, "User ID");

            const existUser = await User.findById(userID);
            checkedNull(existUser, "User don't exist !!!");

            const result = await Comment.find({ commentator: userID })
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .select("-createdAt -updatedAt -__v");
            checkedNull(result, "The User has no comments yet !!!");

            return {
                success: true,
                status: 200,
                message: "Get All Comment Of User Successful!!!",
                data: result,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    getAllByProID: async (proID, pageSize, pageNumber) => {
        try {
            checkedObjectId(proID, "Product ID");

            const existProduct = await Product.findById(proID);
            checkedNull(existProduct, "Product don't exist !!!");

            const result = await Comment.find({ product: proID })
                .limit(pageSize)
                .skip(pageSize * (pageNumber - 1))
                .select("-createdAt -updatedAt -__v");
            checkedNull(result, "This Product has no comments yet !!!");

            return {
                success: true,
                status: 200,
                message: "Get All Comment Of Product Successful!!!",
                data: result,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    getByCmtID: async (cmtID) => {
        try {
            checkedObjectId(cmtID, "Comment ID");

            const existComment = await Comment.findById(cmtID).select("-createdAt -updatedAt -__v");
            checkedNull(existComment, "Comment don't exist !!!")

            return {
                success: true,
                status: 200,
                message: "Get Comment Successful!!!",
                data: existComment,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    create: async (userID, proID, rating, content) => {
        try {
            checkedObjectId(userID, "User ID");
            checkedObjectId(proID, "Product ID");

            const existUser = await User.findById(userID);
            checkedNull(existUser, "User don't exist !!!");

            const existProduct = await Product.findById(proID);
            checkedNull(existProduct, "Product don't exist !!!");

            const existComment = await Comment.findOne({
                commentator: userID,
                product: proID,
            });
            if (existComment) return {
                success: false,
                status: 409,
                message: "User have already commented on this product !!!",
            }

            const newComment = new Comment({
                commentator: userID,
                product: proID,
                rating: rating,
                content: content,
            });

            await newComment.save();

            await updateRatingOfProduct(proID);

            return {
                success: true,
                status: 200,
                message: "Create Comment Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    deleteByID: async (cmtID) => {
        try {
            checkedObjectId(cmtID, "Comment ID");

            const deletedComment = await Comment.findByIdAndDelete(cmtID);
            checkedNull(deletedComment, "Comment don't exist !!!");

            await updateRatingOfProduct(deletedComment.product);

            return {
                success: true,
                status: 200,
                message: "Delete Comment Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    deleteAllByUserID: async (userID) => {
        try {
            checkedObjectId(userID, "User ID");

            const listDelete = await Comment.find({ commentator: userID });
            await Promise.all(listDelete.map((cmt) => deleteByID(cmt._id)));

            return {
                success: true,
                status: 200,
                message: "Delete All Comment Of User Successful!!!",
                total: listDelete.length,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    deleteAllByProID: async (proID) => {
        try {
            checkedObjectId(proID, "Product ID");

            const result = await Comment.deleteMany({ product: proID });

            return {
                success: true,
                status: 200,
                message: "Delete All Comment Of Product Successful!!!",
                total: result.deletedCount,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    deleteAll: async () => {
        try {
            const result = await Comment.deleteMany();

            return {
                success: true,
                status: 200,
                message: "Delete All Comment Successful!!!",
                total: result.deletedCount,
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },

    updateRatingOfProduct: async (proID) => {
        try {
            checkedObjectId(proID, "Product ID");

            let newRating = 0;
            const listComment = await getAllByProID(proID);
            if (listComment.data.length !== 0) {
                const totalRating = listComment.data.reduce((total, cmt) => total + cmt.rating, 0);
                newRating = (totalRating / listComment.data.length).toFixed(1);
            }

            await Product.findByIdAndUpdate(
                proID,
                { $set: { rating: newRating } },
            )

            return {
                success: true,
                status: 200,
                message: "Update Rating Product Successful!!!",
            }
        } catch (err) {
            return {
                success: false,
                status: err.status || 500,
                message: err.message || "Something went wrong on Variant !!!",
            }
        }
    },
}