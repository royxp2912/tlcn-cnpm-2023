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
} from "../controllers/user.controller.js";

const router = express.Router();

// Find User By ID
router.get("/", findAllUser);
router.get("/:userID", findUserByID);

// Edit User By ID
router.put("/:userID", editUserByID);
router.patch("/lock/:userID", lockUserByID);
router.patch("/unlock/:userID", unlockUserByID);
router.patch("/upload-avatar/:userID", uploadCloud.single("avatar"), uploadAvatarByID);

// Delete User By User ID
router.delete("/:userID", deleteUserByUserID);

export default router