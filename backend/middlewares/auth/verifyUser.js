import { createError } from "../../utils/createError";

const verifyUser = async (req, res, next) => {
    try {
        if (req.userID !== req.params) return createError(403, "You have not been granted permission to access this resource!!!");
        next();
    } catch (err) {
        next(err);
    }
}

export default verifyUser