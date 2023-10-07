import express from "express";
import {
    createOneVariant, deleteVariantByID, getVariantByID, updateVariantByID
} from "../controllers/variant.controller.js";

const router = express.Router();

// get variant by varid
router.get("/:varID", getVariantByID);

// create one
router.post("/create", createOneVariant);

// update by variant id
router.put("/update/:varID", updateVariantByID);

// delete by variant id
router.delete("/delete/:varID", deleteVariantByID);

export default router