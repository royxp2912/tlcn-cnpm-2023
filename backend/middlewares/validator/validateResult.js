import { validationResult } from 'express-validator';
import { createError } from '../../utils/createError.js';

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (err) {
        const formattedErrors = err.array().map(error => {
            return {
                field: error.path,
                value: error.value,
                message: error.msg,
            };
        });
        // next(createError(400, err.array()));
        next(createError(400, formattedErrors));
    }
}

export default validateResult