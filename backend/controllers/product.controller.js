import { createError } from '../utils/createError.js';
import { extractPublicId } from 'cloudinary-build-url';
import cloudinary from '../utils/cloudinary_config.js';
import {
    create,
    update,
    getAll,
    getById,
    deleteById,
    getHotDeal,
    findByColor,
    getByStatus,
    updateImages,
    findByKeyword,
    getAllByCateID,
    findByColorAndSort,
    findByKeywordAndSort,
    getQuantityByEachBrand,
    getQuantityHotDealByEachBrand,
} from '../services/product.service.js';

export const updateImagesProduct = async (req, res, next) => {
    if (!req.files) return next(createError(404, 'No image changes exist !'));
    const images = req.files.map((image) => image.path);
    console.log(images);
    try {
        const product = req.body.product;
        const { success, message, data, status } = await updateImages(product, images);
        if (!success) {
            // Xóa tất cả các ảnh nếu update thất bại !!!
            const listPublicId = images.map((path) => extractPublicId(path));
            const result = await cloudinary.api.delete_resources(listPublicId);
            if (Object.values(result.deleted)[0] === 'not_found')
                return next(createError(404, 'Delete Image Failed !!!'));

            return next(createError(status, message));
        }

        const listPublicId = data.images.map((path) => extractPublicId(path));
        const result = await cloudinary.api.delete_resources(listPublicId);
        if (Object.values(result.deleted)[0] === 'not_found') return next(createError(404, 'Delete Image Failed !!!'));

        res.status(status).send({
            success: success,
            message: message,
        });
    } catch (err) {
        next(err);
    }
};

export const getProductByStatus = async (req, res, next) => {
    try {
        const statusProduct = req.query.status || 'Available';
        const pageSize = req.query.pageSize || 8;
        const pageNumber = req.query.pageNumber || 1;
        const { success, message, pages, data, status } = await getByStatus(statusProduct, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success: success,
            message: message,
            pages,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

export const getQuantityHotDealOfEachBarnd = async (req, res, next) => {
    try {
        const { success, message, data, status } = await getQuantityHotDealByEachBrand();
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success: success,
            message: message,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

export const getInfoOfEachBarnd = async (req, res, next) => {
    try {
        const { success, message, data, status } = await getQuantityByEachBrand();
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success: success,
            message: message,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

export const findProductByColor = async (req, res, next) => {
    try {
        const sort = req.query.sort;
        const color = req.query.color;
        const pageSize = req.query.pageSize || 8;
        const pageNumber = req.query.pageNumber || 1;

        if (sort) {
            const { success, message, pages, data, status } = await findByColorAndSort(
                color,
                pageSize,
                pageNumber,
                sort,
            );
            if (!success) return next(createError(status, message));
            res.status(status).json({
                success: success,
                message: message,
                pages,
                data: data,
            });
        }

        const { success, message, pages, data, status } = await findByColor(color, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        if (data.length === 0) {
            res.status(404).json({
                success: success,
                message: `No shoes found matching color <${color}> !!!`,
            });
        }

        res.status(status).json({
            success: success,
            message: message,
            pages,
            total: data.length,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

export const findProductByKeyword = async (req, res, next) => {
    try {
        const sort = req.query.sort;
        const keyword = req.query.keyword;
        const pageSize = req.query.pageSize || 8;
        const pageNumber = req.query.pageNumber || 1;

        if (sort) {
            const { success, message, pages, data, status } = await findByKeywordAndSort(
                keyword,
                pageSize,
                pageNumber,
                sort,
            );
            if (!success) return next(createError(status, message));
            res.status(status).json({
                success: success,
                message: message,
                pages,
                total: data.length,
                data: data,
            });
        }

        const { success, message, pages, data, status } = await findByKeyword(keyword, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        if (data.length === 0) {
            res.status(404).json({
                success: success,
                message: `No shoes found matching keyword <${keyword}> !!!`,
            });
        }

        res.status(status).json({
            success: success,
            message: message,
            pages,
            total: data.length,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { success, message, data, status } = await update(req.body);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success: success,
            message: message,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { success, message, data, status } = await deleteById(req.body.product);
        if (!success) return next(createError(status, message));

        if (data.images.length !== 0) {
            // Xóa tất cả các ảnh (nếu có) nếu delete thành công !!!
            const listPublicId = data?.images.map((path) => extractPublicId(path));
            const result = await cloudinary.api.delete_resources(listPublicId);
            if (Object.values(result.deleted)[0] === 'not_found')
                return next(createError(404, 'Delete Image Failed !!!'));
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
        const { success, message, data, status } = await getById(req.query.product);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success: success,
            message: message,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllProductByCategory = async (req, res, next) => {
    try {
        const color = req.query.color;
        const brand = req.query.brand;
        const category = req.query.category;
        const sort = req.query.sort || 'new';
        const pageSize = req.query.pageSize || 8;
        const pageNumber = req.query.pageNumber || 1;

        const { success, message, pages, data, status } = await getAllByCateID(
            category,
            color,
            brand,
            sort,
            pageSize,
            pageNumber,
        );
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success: success,
            message: message,
            pages,
            total: data.length,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

export const getAllProduct = async (req, res, next) => {
    try {
        const pageSize = req.query.pageSize || 8;
        const pageNumber = req.query.pageNumber || 1;

        const { success, message, pages, data, status } = await getAll(pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success: success,
            message: message,
            pages,
            total: data.length,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

export const getProductHotDeal = async (req, res, next) => {
    try {
        const pageSize = req.query.pageSize || 8;
        const pageNumber = req.query.pageNumber || 1;

        const { success, message, pages, data, status } = await getHotDeal(pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        res.status(status).json({
            success: success,
            message: message,
            pages,
            total: data.length,
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

export const createProduct = async (req, res, next) => {
    const images = req.files.map((image) => image.path);

    try {
        const { success, message, status } = await create(req.body, images);
        if (!success) {
            // Xóa tất cả các ảnh nếu create thất bại !!!
            const listPublicId = images.map((path) => extractPublicId(path));
            const result = await cloudinary.api.delete_resources(listPublicId);
            if (Object.values(result.deleted)[0] === 'not_found')
                return next(createError(404, 'Delete Image Failed !!!'));

            return next(createError(status, message));
        }

        res.status(status).json({
            success: success,
            message: message,
        });
    } catch (err) {
        next(err);
    }
};
