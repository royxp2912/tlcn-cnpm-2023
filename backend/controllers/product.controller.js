import { createError } from "../utils/createError.js";
import { extractPublicId } from 'cloudinary-build-url';
import cloudinary from "../utils/cloudinary_config.js";
import {
    create,
    update,
    getAll,
    getById,
    deleteById,
    getAllByCateID,
    findByKeyword,
    findByKeywordAndSort,
    findByColor,
    findByColorAndSort,
    getHotDeal,
} from "../services/product.service.js";

export const findProductByColor = async (req, res, next) => {
    try {
        const pageSize = req.body.pageSize || 8;
        const pageNumber = req.query.pageNumber || 1;
        const sort = req.query.sort;

        if (sort) {
            const { success, message, data, status } = await findByColorAndSort(req.body.color, pageSize, pageNumber, sort);
            if (!success) return next(createError(status, message));
            res.status(status).json({
                success: success,
                message: message,
                data: data
            });
        }

        const { success, message, data, status } = await findByColor(req.body.color, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        if (data.length === 0) {
            res.status(404).json({
                success: success,
                message: `No shoes found matching color <${req.body.color}> !!!`,
            });
        }

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

export const findProductByKeyword = async (req, res, next) => {
    try {
        const pageSize = req.body.pageSize || 8;
        const pageNumber = req.query.pageNumber || 1;
        const sort = req.query.sort;

        if (sort) {
            const { success, message, data, status } = await findByKeywordAndSort(req.body.keyword, pageSize, pageNumber, sort);
            if (!success) return next(createError(status, message));
            res.status(status).json({
                success: success,
                message: message,
                data: data
            });
        }

        const { success, message, data, status } = await findByKeyword(req.body.keyword, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        if (data.length === 0) {
            res.status(404).json({
                success: success,
                message: `No shoes found matching keyword <${req.body.keyword}> !!!`,
            });
        }

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

export const getAllProductByCategory = async (req, res, next) => {
    try {
        const pageSize = 8;
        const pageNumber = req.query.pageNumber || 1;

        const { success, message, data, status } = await getAllByCateID(req.params.cateID, pageSize, pageNumber);
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

export const getAllProduct = async (req, res, next) => {
    try {
        const pageSize = 8;
        const pageNumber = req.query.pageNumber || 1;

        const { success, message, data, status } = await getAll(pageSize, pageNumber);
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

export const getProductHotDeal = async (req, res, next) => {
    try {
        const pageSize = req.query.pageSize || 8;
        const pageNumber = req.query.pageNumber || 1;

        const { success, message, data, status } = await getHotDeal(pageSize, pageNumber);
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
        const { success, message, status } = await create(req.body, images);
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
        });
    } catch (err) {
        next(err);
    }
}