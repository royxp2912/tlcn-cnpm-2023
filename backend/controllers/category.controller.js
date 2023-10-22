import { createError } from "../utils/createError.js";
import cloudinary from "../utils/cloudinary_config.js";
import { extractPublicId } from 'cloudinary-build-url';
import {
    create,
    getAll,
    getById,
    updateName,
    deleteById,
    updateImage,
} from "../services/category.service.js";

export const getAllCategory = async (req, res, next) => {
    try {
        const { success, message, data, status } = await getAll();
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success: success,
            message: message,
            total: data.length,
            data: data
        });
    } catch (err) {
        next(err);
    }
};

export const getByIdCategory = async (req, res, next) => {
    try {
        const { success, message, data, status } = await getById(req.params.cateId);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success: success,
            message: message,
            data: data
        });
    } catch (err) {
        next(err);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const { success, message, data, status } = await deleteById(req.params.cateId);
        if (!success) return next(createError(status, message));

        // xóa image nếu delete thành công !!!
        const publicId = extractPublicId(data?.image);
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result !== "ok") return next(createError(404, "Xóa Hình ảnh trên Cloud thất bại!"));

        res.status(status).send({
            success: success,
            message: message,
        });
    } catch (err) {
        next(err);
    }
};

export const updateImageCategory = async (req, res, next) => {
    const image = req.file.path;
    try {
        const { success, message, data, status } = await updateImage(req.params.cateId, image);
        if (!success) {
            // xóa image mới nếu update thất bại !!!
            const publicId = extractPublicId(image);
            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result !== "ok") return next(createError(404, "Xóa Hình ảnh trên Cloud thất bại!"));
            return next(createError(status, message));
        }

        // xóa image cũ nếu update image mới thành công!!!
        const publicId = extractPublicId(data.image);
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result !== "ok") return next(createError(404, "Xóa Hình ảnh trên Cloud thất bại!"));

        // truyền url mới vào data trả về
        data.image = image;

        res.status(status).send({
            success: success,
            message: message,
            data: data
        });
    } catch (err) {
        next(err);
    }
};

export const updateNameCategory = async (req, res, next) => {
    try {
        const { success, message, data, status } = await updateName(req.params.cateId, req.body.name);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success: success,
            message: message,
            data: data
        });
    } catch (err) {
        next(err);
    }
};

export const createCategory = async (req, res, next) => {
    const image = req.file.path;

    try {
        const { success, message, data, status } = await create(req.body, image);
        if (!success) {
            // xóa image nếu create thất bại!!!
            const publicId = extractPublicId(image);
            const result = await cloudinary.uploader.destroy(publicId);
            if (result.result !== "ok") return next(createError(404, "Xóa Hình ảnh trên Cloud thất bại!"));
            return next(createError(status, message));
        }
        res.status(status).send({
            success: success,
            message: message,
            data: data
        });
    } catch (err) {
        next(err);
    }
};