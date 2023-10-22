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
        const { success, status, message } = await deleteByID(req.params.addID);
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
        const { success, status, message, total } = await deleteAllByUserID(req.params.userID);
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
        const { success, status, message } = await unDefault(req.params.addID);
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
        const { success, status, message } = await setDefault(req.params.addID);
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
        const { success, status, message } = await update(req.params.addID, req.body);
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
        const { success, status, message, data } = await getByID(req.params.addID);
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
        const { success, status, message, data } = await getAllByUserID(req.params.userID);
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