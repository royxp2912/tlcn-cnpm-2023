import { createError } from '../utils/createError.js';
import { addToCart, create, getByUserID, removeFromCart } from '../services/cart.service.js';

export const getCartByUserID = async (req, res, next) => {
    try {
        const { success, status, message, data } = await getByUserID(req.query.user);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
            data,
        });
    } catch (err) {
        next(err);
    }
};

export const removeItemFromCart = async (req, res, next) => {
    try {
        const { success, status, message } = await removeFromCart(req.query.user, req.query.product);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
};

export const addItemToCart = async (req, res, next) => {
    try {
        const { success, status, message } = await addToCart(req.body);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
};

export const createCart = async (req, res, next) => {
    try {
        const { success, status, message } = await create(req.body.user);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
};
