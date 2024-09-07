import shopModel from '../models/shopModels.js';
import fs from 'fs';

// Add shop
const addShop = async (req, res) => {
    let image_filename = req.file ? `${req.file.filename}` : null;

    const shop = new shopModel({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        rating: req.body.rating,
        image: image_filename
    });

    try {
        await shop.save();
        res.json({ success: true, message: "Shop Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding shop" });
    }
}

// List all shops
const listShops = async (req, res) => {
    try {
        const shops = await shopModel.find({});
        res.json({ success: true, data: shops });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching shops" });
    }
}

// Remove shop
const removeShop = async (req, res) => {
    try {
        const shop = await shopModel.findById(req.body.id);
        if (shop.image) {
            fs.unlink(`uploads/${shop.image}`, () => {});
        }
        await shopModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Shop Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing shop" });
    }
}

export { addShop, listShops, removeShop };