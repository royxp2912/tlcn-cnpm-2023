import jwt from "jsonwebtoken";
import { createError } from "../../utils/createError.js";
import decrypt from "../../helpers/crypto/decrypt.js";

const verifyAccessToken = async (req, res, next) => {
    // giải mã access token
    const authHeader = req.headers.authorization;
    if (!authHeader || !(authHeader.startsWith("Bearer "))) {
        return next(createError(401, "Unauthenticated User !!!"));
    }

    const isToken = authHeader.substring(7);
    const token = decrypt(isToken);

    jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, data) => {
        if (err) return next(createError(403, "Access Token is incorrect or has expired !!!"));

        req.userID = data.id;
        next();
    })
}

export default verifyAccessToken