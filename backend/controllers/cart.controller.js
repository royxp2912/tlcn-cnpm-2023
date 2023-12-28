import { createError } from '../utils/createError.js';
import {
    create,
    addToCart,
    getByUserID,
    removeFromCart,
    updateVariantInCart,
    addToCartWithoutVar,
} from '../services/cart.service.js';


export const addItemToCartWithoutVariant = async (req, res, next) => {
    try {
        const { success, status, message } = await addToCartWithoutVar(req.body);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
};

export const updateVariantProInCart = async (req, res, next) => {
    try {
        const user = req.body.user;
        const size = req.body.size;
        const color = req.body.color;
        const product = req.body.product;
        const quantity = req.body.quantity;
        const { success, status, message } = await updateVariantInCart(user, product, color, size, quantity);
        if (!success) return next(createError(status, message));

        res.status(status).send({
            success,
            message,
        });
    } catch (err) {
        next(err);
    }
};

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
        const user = req.query.user;
        const product = req.query.product;
        const { success, status, message } = await removeFromCart(user, product);
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
