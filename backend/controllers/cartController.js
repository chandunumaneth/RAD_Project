import userModel from "../models/userModels.js";

const addToCart = async (req, res) => {
    try {
        // Fetch user data by userId
        let userData = await userModel.findOne({ _id: req.body.userId });

        let cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({ success: true, message: "Added to cart" });

    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: "Server error" });
    }
}

const removeFromCart = async (req, res) => {
    try{
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = userData.cartData || {}

        if(!cartData[req.body.itemId]){
            return res.status(404).send({ success: false, message: "Item not found in cart" });
        }

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1  
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });

    }catch(error){
        console.log(error);
        res.status(500).send({ success: false, message: "Server error" });
    }
}

const getCart = async (req, res) => {
    try{
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData

        res.status(200).json({ success: true, cartData });
    }catch(error){
        console.log(error);
        res.send(500).send({ success: false, message: "Server error" });
    }
}

export { addToCart, removeFromCart, getCart };