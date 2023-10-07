import express from "express";
import decrypt from "../helpers/crypto/decrypt.js";
import verifyRefreshToken from "../middlewares/auth/verifyRefreshToken.js";
import validateLogin from "../middlewares/validator/auth/validateLogin.js";
import {
    createTokenTest, login, register, getTokenAvai, lockedToken, refreshAccessToken, logout
} from "../controllers/auth.controller.js";

const router = express.Router();

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", validateLogin, login);

// LOGOUT
router.delete("/logout/:userID", logout);

// REFRESH TOKEN
router.put("/refreshToken", verifyRefreshToken, refreshAccessToken);

// -------------------------------------------------------------------------------------------------------

// test decrypt token
router.get("/get/decrypt", (req, res, next) => {
    return res.status(200).send(
        {
            decrypt: decrypt(req.body.token),
        }
    )
});

export default router