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
import sharp from "sharp";
import got from "got";


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
        if (!req.file) {
            return next(createError(400, "Avatar does not exist for data sent !!!"))
        }
        const image = req.file.path;
        const { success, status, message, data } = await updateAvatar(req.params.userID, image);
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

export const isExistUser = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getUserByID(req.params.userID);
        if (!success) return next(createError(status, message));

        next();
    } catch (err) {
        next(err);
    }
}

export const testUploadAvatarByID = async (req, res, next) => {
    try {
        const imageUrl = cloudinary.url('shoeshop/cjras6g83ifxhobhyfda.jpg', {
            width: 200,
            height: 200,
            crop: 'fill'
        });

        console.log(imageUrl);
        // if (!req.file) {
        //     return next(createError(400, "Avatar does not exist for data sent !!!"))
        // }
        // const result = req.file;

        // const bufferImg = await got(result.path, { responseType: 'buffer' });
        // const imageBuffer = bufferImg.body;

        // const resizedImageBuffer = await sharp(imageBuffer)
        //     .resize({
        //         width: 150,
        //         height: 150,
        //         fit: sharp.fit.inside,
        //         withoutEnlargement: true,
        //     })
        //     .toBuffer();

        // // const publicID = Date.now() + result.originalname;
        // const regex = /\/([^/]+)\.jpg$/;
        // let publicID = "";
        // const resultRegex = regex.exec(result.path);
        // if (resultRegex && resultRegex[1]) {
        //     publicID = resultRegex[1];
        //     console.log(publicID);
        // } else {
        //     console.log('Không tìm thấy tên ảnh trong URL');
        // }
        // const response = await cloudinary.uploader.upload_stream({
        //     resource_type: 'image',
        //     folder: "shoeshop",
        //     public_id: publicID,
        //     overwrite: true,
        // }, (error, result) => {
        //     if (error) {
        //         console.log('Error uploading resized image:', error);
        //         res.status(500).json({
        //             message: "Error uploading resized image",
        //             error,
        //         });
        //     } else {
        //         res.status(200).json({
        //             message: "Photo uploaded and resized successfully",
        //             result,
        //         });
        //     }
        // }).end(resizedImageBuffer);
    } catch (err) {
        next(err);
    }
}