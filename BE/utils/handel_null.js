import { createError } from "./createError.js";

export const checkedNull = (data, message) => {
    if (data === null) throw createError(404, message);

    return data;
}

export const checkedNullAndFormatData = (data, message) => {
    if (data === null) throw createError(404, message);

    const { createdAt, updatedAt, __v, ...others } = data._doc;
    return others;
}