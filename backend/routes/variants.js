import express from "express";
import {
    getVariantByID,
    createOneVariant,
    getAllVarByProID,
    deleteVariantByID,
    updateVariantByID,
} from "../controllers/variant.controller.js";

const router = express.Router();

// get variant by varid
router.get("/:varID", getVariantByID);
router.get("/product/:proID", getAllVarByProID);

// create one
router.post("/create", createOneVariant);

// update by variant id
router.put("/update/:varID", updateVariantByID);

// delete by variant id
router.delete("/delete/:varID", deleteVariantByID);

export default router