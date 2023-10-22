import jwt from "jsonwebtoken";
import { createError } from "../../utils/createError.js";
import decrypt from "../../helpers/crypto/decrypt.js";
import { getTokenLastest, lockAllToken } from "../../services/auth.service.js";

const verifyRefreshToken = async (req, res, next) => {
    // giải mã refresh token
    const isToken = req.cookies.refreshToken;
    if (!isToken) return next(createError(401, "Unauthenticated User !!!"));
    const token = decrypt(isToken);

    jwt.verify(token, process.env.JWT_SECRET_REFRESH, async (err, data) => {
        if (err) return next(createError(403, "Refresh Token is incorrectc or has expired !!!"));

        const { success, lastedToken, status, message } = await getTokenLastest(data.id);
        if (!success) return next(createError(status, message));

        // console.log("oldToken: ", decrypt(lastedToken.value));

        if (token !== decrypt(lastedToken.value)) {
            // vô hiệu hóa all token và yêu cầu login lại vì token đã bị trộm
            await lockAllToken(data.id);
            return next(createError(403, "Refresh Token is not available !!! Please login again !!!"));
        }

        req.userID = data.id;
        next();
    })
}

export default verifyRefreshToken