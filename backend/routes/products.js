import uploadCloud from "../middlewares/multerCloudinary.js";
import express from "express";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getByIdProduct,
    getProductHotDeal,
    findProductByColor,
    getInfoOfEachBarnd,
    findProductByKeyword,
    getAllProductByCategory,
} from "../controllers/product.controller.js";

const router = express.Router();

// GET ALL
router.get("/", getAllProduct);
router.get("/brand", getInfoOfEachBarnd);
router.get("/detail", getByIdProduct);
router.get("/category", getAllProductByCategory);

// find
router.get("/search/hotDeal", getProductHotDeal);
router.get("/search/keyword", findProductByKeyword);
router.get("/search/color", findProductByColor);

// CREATE NEW PRODUCT
router.post("/create", uploadCloud.array("images"), createProduct);

// UPDATE
router.put("/update", updateProduct);

// DELETE
router.delete("/", deleteProduct);

export default router