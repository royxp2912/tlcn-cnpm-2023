import express from "express";
import {
    getVariantByID,
    createOneVariant,
    getAllVarByProID,
    deleteVariantByID,
    updateVariantByID,
    getSizeOfProductByColorAndProID,
    getColorOfProductBySizeAndProID,
    getOneVarByProID,
    getAllDetailVarByProID,
} from "../controllers/variant.controller.js";

const router = express.Router();

// get variant by varid
router.get("/", getVariantByID);
router.get("/product", getAllVarByProID);
router.get("/product/one", getOneVarByProID);
router.get("/product/detail", getAllDetailVarByProID);
router.get("/product/size", getSizeOfProductByColorAndProID);
router.get("/product/color", getColorOfProductBySizeAndProID);

// create one
router.post("/create", createOneVariant);

// update by variant id
router.put("/update", updateVariantByID);

// delete by variant id
router.delete("/delete", deleteVariantByID);

export default router