import express from "express";
import uploadCloud from "../middlewares/multerCloudinary.js";
import verifyAccessToken from "../middlewares/auth/verifyAccessToken.js";
import {
    createCategory, deleteCategory, getAllCategory, getByIdCategory, updateImageCategory, updateNameCategory
} from "../controllers/category.controller.js";

const router = express.Router();

// GET
router.get("/get/:cateId", getByIdCategory);
router.get("/all", getAllCategory);

// CREATE
router.post("/create", uploadCloud.single("image"), createCategory);

// UPDATE
// test verify
router.put("/updateName/:cateId", verifyAccessToken, updateNameCategory);

router.put("/updateImg/:cateId", uploadCloud.single("image"), updateImageCategory);

// DELETE
router.delete("/:cateId", deleteCategory);

export default router