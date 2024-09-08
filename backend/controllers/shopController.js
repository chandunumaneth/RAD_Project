import shopModel from '../models/shopModels.js';
import foodModel from '../models/foodModels.js';
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

const listFoods = async (req, res) => {
    try {
      const foods = await foodModel.find({}).populate('shop', 'name'); // Populate 'shop' field with 'name'
      res.json({ success: true, foods });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error fetching foods" });
    }
  };

// Remove shop
// const removeShop = async (req, res) => {
//     try {
//         const shop = await shopModel.findById(req.body.id);
//         if (shop.image) {
//             fs.unlink(`uploads/${shop.image}`, () => {});
//         }
//         await shopModel.findByIdAndDelete(req.body.id);
//         res.json({ success: true, message: "Shop Removed" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error removing shop" });
//     }
// }

const removeShop = async (req, res) => {
    try {
        const shop = await shopModel.findById(req.body.id);
        
        if (!shop) {
            return res.json({ success: false, message: "Shop not found" });
        }

        // Delete associated foods
        await foodModel.deleteMany({ shop: req.body.id });

        // Delete shop image if it exists
        if (shop.image) {
            fs.unlink(`uploads/${shop.image}`, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }

        // Delete the shop
        await shopModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Shop and associated foods removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing shop and associated foods" });
    }
}

export { addShop, listShops, removeShop , listFoods};
