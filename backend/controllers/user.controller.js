import { createError } from "../utils/createError.js";
import { extractPublicId } from "cloudinary-build-url";
import cloudinary from "../utils/cloudinary_config.js";
import {
    lockUser,
    getAllUser,
    unlockUser,
    getUserByID,
    updateAvatar,
    deleteUserByID,
    updateUserByID,
    getAllUserByStatus,
} from "../services/user.service.js";


export const deleteUserByUserID = async (req, res, next) => {
    try {
        const { success, message, data, status } = await deleteUserByID(req.params.userID);
        if (!success) return next(createError(status, message));

        if (data.avatar !== "https://res.cloudinary.com/dtfei3453/image/upload/v1697015386/shoeshop/avatar_default_kf1ko4.png") {
            // Xóa avatar nếu nó không phải là avatar default
            const publicId = extractPublicId(data.avatar);
            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result !== "ok") return next(createError(404, "Xóa Hình ảnh trên Cloud thất bại!"));
        }

        res.status(status).send({
            success: success,
            message: message,
        });
    } catch (err) {
        next(err);
    }
};

export const uploadAvatarByID = async (req, res, next) => {
    try {
        const image = req.file.path;
        const { success, status, message, data } = await updateAvatar(req.params.userID, image);
        if (!success) {
            // xóa image nếu uploadAvatar thất bại!!!
            const publicId = extractPublicId(image);
            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result !== "ok") return next(createError(404, "Xóa Hình ảnh trên Cloud thất bại!"));
            return next(createError(status, message));
        }

        if (data.avatar !== "https://res.cloudinary.com/dtfei3453/image/upload/v1697015386/shoeshop/avatar_default_kf1ko4.png") {
            // Xóa avatar cũ nếu nó không phải là avatar default
            const publicId = extractPublicId(data.avatar);
            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result !== "ok") return next(createError(404, "Xóa Hình ảnh trên Cloud thất bại!"));
        }

        res.status(status).json({
            success,
            message,
        })
    } catch (err) {
        next(err);
    }
}

export const unlockUserByID = async (req, res, next) => {
    try {
        const { success, status, message } = await unlockUser(req.params.userID, req.body);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
        })
    } catch (err) {
        next(err);
    }
}

export const lockUserByID = async (req, res, next) => {
    try {
        const { success, status, message } = await lockUser(req.params.userID, req.body);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
        })
    } catch (err) {
        next(err);
    }
}

export const editUserByID = async (req, res, next) => {
    try {
        const { success, status, message } = await updateUserByID(req.params.userID, req.body);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
        })
    } catch (err) {
        next(err);
    }
}

export const findAllUser = async (req, res, next) => {
    try {
        const userStatus = req.query.status;
        if (userStatus === "Locked" || userStatus === "Available") {
            const { success, status, message, data } = await getAllUserByStatus(req.query.status);
            if (!success) return next(createError(status, message));
            res.status(status).json({
                success,
                message,
                total: data.length,
                data,
            })
        } else {
            res.status(404).json({
                success: false,
                message: `Status <${userStatus}> don't exist !!!`,
            })
        }

        const { success, status, message, data } = await getAllUser();
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
            total: data.length,
            data,
        })
    } catch (err) {
        next(err);
    }
}

export const findUserByID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getUserByID(req.params.userID);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
            data
        })
    } catch (err) {
        next(err);
    }
}