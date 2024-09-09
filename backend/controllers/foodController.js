import foodModel from '../models/foodModel.js';
import fs from 'fs';
import mongoose from 'mongoose'; // Ensure mongoose is imported

// Add food item
const addFood = async (req, res) => {
    try {
        const { name, description, price, category, shopId } = req.body; // Include shopId in destructuring

        // Use the uploaded image filename
        const image_filename = req.file ? `${req.file.filename}` : '';

        const food = new foodModel({
            name,
            description,
            price,
            category,
            shop: shopId, // Save the shop reference
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: 'Food Added' });
    } catch (error) {
        console.error("Error adding food:", error);
        res.json({ success: false, message: 'Error adding food' });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({}).populate('shop', 'name'); 
        // Transform foods to include shop name in the response
        const foodListWithShopNames = foods.map(food => ({
            ...food._doc, 
            shop: food.shop ? food.shop.name : 'unknown' // Add shop name or null if not available
        }));

        res.json({ success: true, data: foodListWithShopNames });
    } catch (error) {
        console.error("Error fetching food list:", error); // Better error logging
        res.json({ success: false, message: 'Error fetching food list' });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (food) {
            if (food.image) {
                fs.unlink(`uploads/${food.image}`, (err) => {
                    if (err) console.error(`Error removing image file: ${err}`);
                });
            }

            await foodModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: 'Food Removed' });
        } else {
            res.json({ success: false, message: 'Food not found' });
        }
    } catch (error) {
        console.error("Error removing food:", error); // Better error logging
        res.json({ success: false, message: 'Error removing food' });
    }
};

export { addFood, listFood, removeFood };
