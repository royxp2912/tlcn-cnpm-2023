import { check } from "express-validator";
import validateResult from "../validateResult.js";

const validateRegister = [
    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('EMAIL_IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID'),
    check('password')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isLength({
            min: 5
        })
        .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
    check('fullName')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('gender')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('birthDay')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateRegister