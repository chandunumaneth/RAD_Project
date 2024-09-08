import express from "express"
import { registerUser, loginUser, getUser, updateUser, deleteUser } from "../controllers/userController.js"


const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/profile/:email", getUser)
userRouter.patch("/profile/:email", updateUser)
userRouter.delete("/profile/:email", deleteUser)

export default userRouter;