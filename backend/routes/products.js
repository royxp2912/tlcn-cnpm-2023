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
    getQuantityHotDealOfEachBarnd,
    getProductByStatus,
} from "../controllers/product.controller.js";

const router = express.Router();

// GET ALL
router.get("/", getAllProduct);
router.get("/detail", getByIdProduct);
router.get("/status", getProductByStatus);
router.get("/brand", getInfoOfEachBarnd);
router.get("/category", getAllProductByCategory);
router.get("/brand/hotDeal", getQuantityHotDealOfEachBarnd);

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