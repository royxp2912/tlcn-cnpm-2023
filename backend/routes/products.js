import express from "express";
import uploadCloud from "../middlewares/multerCloudinary.js";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getByIdProduct,
    getAllProductByCategory,
} from "../controllers/product.controller.js";

const router = express.Router();

// GET ALL
router.get("/", getAllProduct);
router.get("/:proId", getByIdProduct);
router.get("/category/:cateID", getAllProductByCategory);

// CREATE NEW PRODUCT
router.post("/create", uploadCloud.array("images"), createProduct);

// UPDATE
router.put("/update/:proId", updateProduct);

// DELETE
router.delete("/:proId", deleteProduct);

export default router