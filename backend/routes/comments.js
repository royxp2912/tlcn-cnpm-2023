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
    deleteAllCommentByProID,
} from "../controllers/comment.controller.js";

const router = express.Router();

// get
router.get("/", getCommentByID);
router.get("/product", getAllCommentByProID);
router.get("/user", getAllCommentByUserID);

// create
router.post("/", createComment);

// put - update 1
router.put("/", updateCommentByID);

// patch - update 1
router.patch("/like", updateCommentLike);

// delete
router.delete("/", deleteAllComment);
router.delete("/one", deleteCommentByID);
router.delete("/product", deleteAllCommentByProID);
router.delete("/user", deleteAllCommentByUserID);

export default router