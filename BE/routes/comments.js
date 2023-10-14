import express from "express";
import {
    createComment,
    getCommentByID,
    deleteAllComment,
    updateCommentLike,
    deleteCommentByID,
    updateCommentByID,
    getAllCommentByProID,
    getAllCommentByUserID,
    deleteAllCommentByUserID,
} from "../controllers/comment.controller.js";

const router = express.Router();

// get
router.get("/:cmtID", getCommentByID);
router.get("/product/:proID", getAllCommentByProID);
router.get("/user/:userID", getAllCommentByUserID);

// create
router.post("/", createComment);

// put - update 1
router.put("/:cmtID", updateCommentByID);

// patch - update 1
router.patch("/:cmtID/like", updateCommentLike);

// delete
router.delete("/", deleteAllComment);
router.delete("/:cmtID", deleteCommentByID);
router.delete("/user/:userID", deleteAllCommentByUserID);

export default router