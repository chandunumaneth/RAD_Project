<<<<<<< Updated upstream
import express from "express";
import { addFood , listFood , removeFood} from "../controllers/foodController.js";
import multer from "multer";
=======
import express from "express"
import { addFood,listFood,removeFood } from "../controllers/foodController.js"
import multer from "multer"
>>>>>>> Stashed changes

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
<<<<<<< Updated upstream
    filename:(req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
=======
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
>>>>>>> Stashed changes
    }
})

<<<<<<< Updated upstream
const upload = multer({storage:storage});

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);


=======
const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);





>>>>>>> Stashed changes
export default foodRouter;