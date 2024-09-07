import foodModel from "../models/foodModels.js";
import fs from 'fs'
import mongoose from 'mongoose'; // Ensure mongoose is imported

const addFood = async (req, res) => {
    const image_filename = req.file ? `${req.file.filename}` : '';
    
    const { name, description, price, category, shopId } = req.body;

    const food = new foodModel({
        name,
        description,
        price,
        category,
        shop: shopId, // Save the shop reference
        image: image_filename
    });

    try{
        await food.save();
        res.json({ success: true, message: "Food added successfully"})
    }catch(error){
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error"})
    }
}

//all foodlist

const listFood = async (req, res) => {
    try{
        const foods = await foodModel.find({});
        res.json({ success: true, foods: foods})
    }catch(error){
        console.log(error)
        res.status(500).json({ success: false, message: "Error"})
    }
}

//remove food

const removeFood = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        const imagePath = `uploads/foods/${food.image}`

        fs.unlink(imagePath, (err) => {
            if(err){
                console.log(err)
            }
        })

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully"})
    }catch(error){
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error"})
    }
}
    


export {addFood, listFood, removeFood}
