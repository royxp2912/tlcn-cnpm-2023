import { check } from "express-validator";
import validateResult from "../validateResult.js";

const validateUploadAvatar = [
    check('avatar')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('EMAIL_IS_EMPTY'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateUploadAvatar