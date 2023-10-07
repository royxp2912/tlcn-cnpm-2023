import { createError } from "../utils/createError.js";
import { extractPublicId } from 'cloudinary-build-url';
import cloudinary from "../utils/cloudinary_config.js";
import { create, getAll, getById, deleteById, update } from "../services/product.service.js";

export const updateProduct = async (req, res, next) => {
    try {
        const { success, message, data, status } = await update(req.params.proId, req.body);
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

export const deleteProduct = async (req, res, next) => {
    try {
        const { success, message, data, status } = await deleteById(req.params.proId);
        if (!success) return next(createError(status, message));

        if (data.images.length !== 0) {
            // Xóa tất cả các ảnh (nếu có) nếu delete thành công !!!
            const listPublicId = data?.images.map((path) => extractPublicId(path));
            const result = await cloudinary.api.delete_resources(listPublicId);
            if (Object.values(result.deleted)[0] === "not_found") return next(createError(404, "Delete Image Failed !!!"));
        }

        res.status(status).send({
            success: success,
            message: message,
        });
    } catch (err) {
        next(err);
    }
};

export const getByIdProduct = async (req, res, next) => {
    try {
        const { success, message, data, status } = await getById(req.params.proId);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success: success,
            message: message,
            data: data
        });
    } catch (err) {
        next(err);
    }
}

export const getAllProduct = async (req, res, next) => {
    try {
        const { success, message, data, status } = await getAll();
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success: success,
            message: message,
            total: data.length,
            data: data
        });
    } catch (err) {
        next(err);
    }
}

export const createProduct = async (req, res, next) => {
    const images = req.files.map((image) => image.path);

    try {
        const { success, message, data, status } = await create(req.body, images);
        if (!success) {
            // Xóa tất cả các ảnh nếu create thất bại !!!
            const listPublicId = images.map((path) => extractPublicId(path));
            const result = await cloudinary.api.delete_resources(listPublicId);
            if (Object.values(result.deleted)[0] === "not_found") return next(createError(404, "Delete Image Failed !!!"));

            return next(createError(status, message));
        }

        res.status(status).json({
            success: success,
            message: message,
            data: data
        });
    } catch (err) {
        next(err);
    }
}