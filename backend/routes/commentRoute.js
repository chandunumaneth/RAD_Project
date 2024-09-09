import express from "express";
import { getComments, addComment, deleteComment, updateComment } from "../controllers/commentController.js";
import authMiddleware from "../middleware/auth.js";

const commentRouter = express.Router();

commentRouter.get("/get/:productId", getComments);
commentRouter.post("/add", authMiddleware, addComment);
commentRouter.delete("/delete/:commentId", authMiddleware, deleteComment);
commentRouter.patch("/update", authMiddleware, updateComment);

export default commentRouter;
