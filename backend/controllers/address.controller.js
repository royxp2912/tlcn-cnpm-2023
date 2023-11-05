import { createError } from "../utils/createError.js";
import {
    create,
    update,
    getAll,
    getByID,
    unDefault,
    deleteAll,
    setDefault,
    deleteByID,
    getAllByUserID,
    deleteAllByUserID,
} from "../services/address.service.js";

export const deleteAddressByID = async (req, res, next) => {
    try {
        const { success, status, message } = await deleteByID(req.body.address);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const deleteAllAddressByUerID = async (req, res, next) => {
    try {
        const { success, status, message, total } = await deleteAllByUserID(req.body.user);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total,
        });
    } catch (err) {
        next(err);
    }
}

export const unDefaultAddress = async (req, res, next) => {
    try {
        const { success, status, message } = await unDefault(req.body.address);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const setDefaultAddress = async (req, res, next) => {
    try {
        const { success, status, message } = await setDefault(req.body.address);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const updateAddressByID = async (req, res, next) => {
    try {
        const { success, status, message } = await update(req.body);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}

export const getAddressByID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getByID(req.query.address);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            data,
        });
    } catch (err) {
        next(err);
    }
}

export const getAllAddressByUserID = async (req, res, next) => {
    try {
        const pageSize = req.query.pageSize || 5;
        const pageNumber = req.query.pageNumber || 1;
        const { success, status, message, data } = await getAllByUserID(req.query.user, pageSize, pageNumber);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total: data.length,
            data,
        });
    } catch (err) {
        next(err);
    }
}

export const getAllAddress = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getAll();
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total: data.length,
            data,
        });
    } catch (err) {
        next(err);
    }
}

export const deleteAllAddress = async (req, res, next) => {
    try {
        const { success, status, message, total } = await deleteAll();
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            total,
        });
    } catch (err) {
        next(err);
    }
}

export const createAddress = async (req, res, next) => {
    try {
        const { success, status, message } = await create(req.body);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
}