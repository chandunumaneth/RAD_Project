import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pasansanjiiwa2022:hat12345@cluster0.bcmel.mongodb.net/food-del').then(()=>console.log("DataBase Connected"));
}