import jwt from "jsonwebtoken";
import encrypt from "../crypto/encrypt.js";

const generateToken = (payload = "") => {
    try {
        const expirationAccess = process.env.JWT_EXPIRATION_ACCESS_IN_MINUTES * 60;
        const secretAccess = process.env.JWT_SECRET_ACCESS;

        const expirationRefresh = process.env.JWT_EXPIRATION_REFRESH_IN_DAYS * 24 * 3600;
        const secretRefresh = process.env.JWT_SECRET_REFRESH;

        const accessToken = jwt.sign(
            {
                id: payload
            },
            secretAccess, { expiresIn: expirationAccess }
        )

        const refreshToken = encrypt(
            jwt.sign(
                {
                    id: payload
                },
                secretRefresh, { expiresIn: expirationRefresh }
            )
        )

        return { accessToken, refreshToken };
    } catch (err) {
        throw (err);
    }
}

export default generateToken
