import { validationResult } from 'express-validator';
import { createError } from '../../utils/createError.js';

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        next();
    } catch (err) {
        next(createError(400, err.array()));
    }
}

export default validateResult