import mongoose from "mongoose";
import { createError } from "./createError.js";

export const checkedObjectId = (id, name) => {
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    if (!isObjectId) throw createError(400, `${name} is not an ObjectId`);

    return id;
}