import express from 'express';
import uploadCloud from '../middlewares/multerCloudinary.js';
import {
    findAllUser,
    isExistUser,
    findUserByID,
    editUserByID,
    lockUserByID,
    unlockUserByID,
    updateUserEmail,
    uploadAvatarByID,
    findUserByKeyword,
    updateUserPassword,
    deleteUserByUserID,
} from '../controllers/user.controller.js';
import sharp from 'sharp';

const router = express.Router();

// Find User By ID
router.get('/', findAllUser);
router.get('/detail', findUserByID);
router.get('/search/keyword', findUserByKeyword);

// Edit User By ID
router.put('/', editUserByID);
router.patch('/lock', lockUserByID);
router.patch('/email', updateUserEmail);
router.patch('/unlock', unlockUserByID);
router.patch('/password', updateUserPassword);
router.patch('/upload-avatar', uploadCloud.single('avatar'), uploadAvatarByID);
// router.patch("/upload-avatar", isExistUser, uploadCloud.single("avatar"), uploadAvatarByID);

// test
// router.patch("/upload-avatar/test/:userID", isExistUser, testUploadAvatarByID);

// Delete User By User ID
router.delete('/', deleteUserByUserID);

export default router;
