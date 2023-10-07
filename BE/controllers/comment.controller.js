import Comment from "../models/Comment.js"

export const createComment = async (req, res) => {
    const newComment = new Comment(req.body);

    try {
        const savedComment = await newComment.save();
        res.status(200).send({
            success: true,
            message: "Tạo Comment Mới Thành Công!",
            data: savedComment
        });
    } catch (err) {
        res.status(404).json(err);
    }
}