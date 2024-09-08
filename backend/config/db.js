import mongoose from "mongoose";

export const connectDB = async () => {
<<<<<<< Updated upstream
    await mongoose.connect('mongodb://localhost:27017/food-del').then(() => console.log("DB Connected!"));

=======
    await mongoose.connect('mongodb://localhost:27017/food-del').then(()=>console.log("DataBase Connected"));
>>>>>>> Stashed changes
}