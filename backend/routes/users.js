import express from "express";
import uploadCloud from "../middlewares/multerCloudinary.js";
import {
    findAllUser,
    findUserByID,
    editUserByID,
    lockUserByID,
    unlockUserByID,
    uploadAvatarByID,
    deleteUserByUserID,
    isExistUser,
    testUploadAvatarByID,
    findUserByKeyword,
} from "../controllers/user.controller.js";
import sharp from "sharp";

const router = express.Router();

// Find User By ID
router.get("/", findAllUser);
router.get("/:userID", findUserByID);
router.get("/search/keyword", findUserByKeyword);

// Edit User By ID
router.put("/:userID", editUserByID);
router.patch("/lock/:userID", lockUserByID);
router.patch("/unlock/:userID", unlockUserByID);
router.patch("/upload-avatar/:userID", isExistUser, uploadCloud.single("avatar"), uploadAvatarByID);
router.patch("/upload-avatar/test/:userID", isExistUser, testUploadAvatarByID);

// Delete User By User ID
router.delete("/:userID", deleteUserByUserID);

export default router