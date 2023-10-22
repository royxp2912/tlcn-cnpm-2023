import { createError } from "../utils/createError.js";
import {
    addNewToken,
    loginService,
    lockAllToken,
    logoutService,
    registerService,
    getTokenLastest,
    createListToken,
    sendCodeToEmail,
    refreshAccessTokenService,
} from "../services/auth.service.js";

export const sendCode = async (req, res, next) => {
    try {
        const { success, status, message, code } = await sendCodeToEmail(req.body.email);
        if (!success) return next(createError(status, message));

        return res.status(status).json({
            success,
            message,
            code,
        })
    } catch (err) {
        next(err);
    }
}

export const lockedToken = async (req, res, next) => {
    try {
        const { success, status, message } = await lockAllToken(req.body.user);
        if (!success) return next(createError(status, message));

        return res.status(status).json({
            success: success,
            message: message,
        })
    } catch (err) {
        next(err);
    }
}

export const getTokenAvai = async (req, res, next) => {
    try {
        const { success, status, message, lastedToken } = await getTokenLastest(req.body.user);
        if (!success) return next(createError(status, message));

        return res.status(status).json({
            success: success,
            message: message,
            data: lastedToken,
        })
    } catch (err) {
        next(err);
    }
}

export const updateTokenTest = async (req, res, next) => {
    try {
        // const { success, status, message } = await addNewToken(req.body.user, req.body.token);
        // if (!success) return next(createError(status, message));

        console.log("done");

        return res.status(200).json({
            success: "success",
            message: "done",
        })
    } catch (err) {
        next(err);
    }
}

export const createTokenTest = async (req, res, next) => {
    try {
        const { success, status, message } = await createListToken(req.body);
        if (!success) return next(createError(status, message));

        return res.status(status).json({
            success: success,
            message: message,
        })
    } catch (err) {
        next(err);
    }
}

export const refreshAccessToken = async (req, res, next) => {
    try {
        const { success, status, message, accessToken, refreshToken } = await refreshAccessTokenService(req.userID);
        if (!success) return next(createError(status, message));

        const infoAdd = await addNewToken(req.userID, refreshToken);
        if (!infoAdd.success) return next(createError(status, message));

        // 1> sau khi vô hiệu hóa token cũ và thêm token mới vào database
        // 2> tiến hành thay đổi giá trị refresh trên cookies cho client
        return res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        })
            .status(status).json({
                success: success,
                message: message,
                accessToken
            })
    } catch (err) {
        next(err);
    }
}

export const logout = async (req, res, next) => {
    try {
        const { success, message, status } = await logoutService(req.params.userID);
        if (!success) return next(createError(status, message));

        res.clearCookie("refreshToken", {
            httpOnly: true
        })
            .status(status).send({
                success: success,
                message: message,
            });

    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const { success, message, status, data, accessToken, refreshToken } = await loginService(req.body);
        if (!success) return next(createError(status, message));

        const detailsCreate = await createListToken(data._id, refreshToken);
        if (!detailsCreate.success) return next(createError(status, message));

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        })
            .status(status).send({
                success: success,
                message: message,
                data: data,
                accessToken,
            });

    } catch (err) {
        next(err);
    }
}

export const register = async (req, res, next) => {
    try {
        const { success, message, status } = await registerService(req.body);
        res.status(status).send({
            success: success,
            message: message
        });
    } catch (err) {
        next(err);
    }
}