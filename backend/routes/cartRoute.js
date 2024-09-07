import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/get", authMiddleware, getCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/add", authMiddleware, addToCart);

export default cartRouter;