import express from "express";
import uploadCloud from "../middlewares/multerCloudinary.js";
import verifyAccessToken from "../middlewares/auth/verifyAccessToken.js";
import {
    createCategory,
    deleteCategory,
    updateCategory,
    getAllCategory,
    getByIdCategory,
    updateNameCategory,
    updateImageCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// GET
router.get("/detail", getByIdCategory);
router.get("/", getAllCategory);

// CREATE
router.post("/", uploadCloud.single("image"), createCategory);

// UPDATE
// test verify
router.put("/updateName", updateNameCategory);
router.put("/update", uploadCloud.single("image"), updateCategory);

router.put("/updateImg", uploadCloud.single("image"), updateImageCategory);

// DELETE
router.delete("/one", deleteCategory);

export default router