import shopModel from '../models/shopModel.js';
import foodModel from '../models/foodModel.js';
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

  const updateShopRating = async (req, res) => {
    const { id, rating } = req.body;
    try {
        const shop = await shopModel.findById(id);
        if (!shop) {
            return res.status(404).json({ success: false, message: 'Shop not found' });
        }
        shop.rating = rating;
        await shop.save();
        res.json({ success: true, message: 'Rating updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating rating' });
    }
};


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

export { addShop, listShops, removeShop , listFoods, updateShopRating};