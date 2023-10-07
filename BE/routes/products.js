import express from "express";
import uploadCloud from "../middlewares/multerCloudinary.js";
import {
    createProduct, deleteProduct, getAllProduct, getByIdProduct, updateProduct
} from "../controllers/product.controller.js";

const router = express.Router();

// GET ALL
router.get("/all", getAllProduct);
router.get("/get/:proId", getByIdProduct);

// CREATE NEW PRODUCT
router.post("/create", uploadCloud.array("images"), createProduct);

// UPDATE
router.put("/update/:proId", updateProduct);

// DELETE
router.delete("/:proId", deleteProduct);

export default router