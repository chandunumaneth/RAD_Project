import express from "express";
import { addShop, listShops, removeShop } from "../controllers/shopController.js";
import multer from "multer";

const shopRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
shopRouter.post("/add", upload.single("image"), addShop);
shopRouter.get("/list", listShops);
shopRouter.post("/remove", removeShop);

export default shopRouter;
