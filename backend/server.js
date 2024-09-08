import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import commentRouter from "./routes/commentRoute.js";
import shopRouter from "./routes/shopRoute.js";
import orderRouter from "./routes/orderRoute.js"

const app = express()
const port = 4000 

app.use(express.json())
app.use(cors())

//connect to database (food-del)
connectDB();

app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/images", express.static("uploads"))
app.use('/api/cart', cartRouter)
app.use('/api/comment', commentRouter)
app.use("/api/shops",shopRouter)
app.use("/api/order",orderRouter)

app.get('/', (req, res) =>{
    res.status(200).send({ message: "Connected"})
})

app.listen(port, ()=> {
    console.log(`Server is runnign in port ${port}`)
})
