import { createError } from "../utils/createError.js";
import { extractPublicId } from "cloudinary-build-url";
import cloudinary from "../utils/cloudinary_config.js";
import {
    lockUser,
    getAllUser,
    unlockUser,
    getUserByID,
    updateAvatar,
    findByKeyword,
    deleteUserByID,
    updateUserByID,
    getAllUserByStatus,
    updateEmailByUserID,
    updatePasswordByUserID,
    forgotPassword,
} from "../services/user.service.js";

export const forgotUserPassword = async (req, res, next) => {
    try {
        const { success, status, message } = await forgotPassword(req.body.email, req.body.password);
        console.log("email: ", req.body.email);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
        })
    } catch (err) {
        next(err);
    }
}

export const updateUserEmail = async (req, res, next) => {
    try {
        const { success, status, message } = await updateEmailByUserID(req.body.user, req.body.newEmail);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
        })
    } catch (err) {
        next(err);
    }
}

export const updateUserPassword = async (req, res, next) => {
    try {
        const { success, status, message } = await updatePasswordByUserID(req.body.user, req.body.oldPass, req.body.newPass);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
        })
    } catch (err) {
        next(err);
    }
}

export const findUserByKeyword = async (req, res, next) => {
    try {
        const pageSize = req.query.pageSize || 10;
        const pageNumber = req.query.pageNumber || 1;

        const { success, status, pages, message, data } = await findByKeyword(req.query.keyword, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        if (data.length === 0) {
            res.status(404).json({
                success: success,
                message: `No User found matching keyword <${req.body.keyword}> !!!`,
            });
        }

        res.status(status).json({
            success,
            message,
            pages,
            total: data.length,
            data,
        })
    } catch (err) {
        next(err);
    }
}

export const deleteUserByUserID = async (req, res, next) => {
    try {
        const userID = req.query.user;
        const { success, message, data, status } = await deleteUserByID(userID);
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
        if (!req.file) {
            return next(createError(400, "Avatar does not exist for data sent !!!"))
        }
        const image = req.file.path;
        const { success, status, message, data } = await updateAvatar(req.body.user, image);
        const publicId = extractPublicId(image);
        if (!success) {
            // xóa image nếu uploadAvatar thất bại!!!
            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result !== "ok") return next(createError(404, "Xóa Hình ảnh trên Cloud thất bại!"));
            return next(createError(status, message));
        }

        if (data.avatar !== "https://res.cloudinary.com/dtfei3453/image/upload/v1697015386/shoeshop/avatar_default_kf1ko4.png") {
            // Xóa avatar cũ nếu nó không phải là avatar default
            const publicIdOld = extractPublicId(data.avatar);
            const result = await cloudinary.uploader.destroy(publicIdOld);
            if (result.result !== "ok") return next(createError(404, "Xóa Hình ảnh trên Cloud thất bại!"));
        }

        res.status(status).json({
            success,
            message,
            data: image,
        })
    } catch (err) {
        next(err);
    }
}

export const unlockUserByID = async (req, res, next) => {
    try {
        const { success, status, message } = await unlockUser(req.body.user);
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
        const { success, status, message } = await lockUser(req.body.user);
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
        const { success, status, message } = await updateUserByID(req.body);
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
        const pageSize = req.query.pageSize || 10;
        const userStatus = req.query.status;
        const pageNumber = req.query.pageNumber || 1;

        if (userStatus) {
            if (userStatus === "Locked" || userStatus === "Available") {
                const { success, status, message, pages, data } = await getAllUserByStatus(userStatus, pageSize, pageNumber);
                if (!success) return next(createError(status, message));
                res.status(status).json({
                    success,
                    message,
                    pages,
                    total: data.length,
                    data,
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: `Status <${userStatus}> don't exist !!!`,
                })
            }
        }

        const { success, status, pages, message, data } = await getAllUser(pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success,
            message,
            pages,
            total: data.length,
            data,
        })
    } catch (err) {
        next(err);
    }
}

export const findUserByID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getUserByID(req.query.user);
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

export const isExistUser = async (req, res, next) => {
    try {
        let userID = req.query.user;
        const { success, status, message, data } = await getUserByID(userID);
        if (!success) return next(createError(status, message));

        next();
    } catch (err) {
        next(err);
    }
}