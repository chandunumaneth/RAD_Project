import userModel from "../models/userModel.js"

// add items to user cart -Crud
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// remove items from user cart-cruD
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// fetch user cart data-cRud
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// update item quantity in user cart
const updateCartItem = async (req, res) => {
    try {
        // Retrieve user data based on userId
        let userData = await userModel.findById(req.body.userId);
        
        // Check if the user exists
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        
        // Get the current cart data
        let cartData = userData.cartData || {};
        
        // Validate the new quantity
        const newQuantity = req.body.quantity;
        if (newQuantity < 0) {
            return res.json({ success: false, message: "Quantity cannot be negative" });
        }
        
        // Update the cart data with the new quantity
        if (newQuantity === 0) {
            // If quantity is 0, remove the item from cart
            delete cartData[req.body.itemId];
        } else {
            // Update the quantity for the item
            cartData[req.body.itemId] = newQuantity;
        }
        
        // Save the updated cart data to the user
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        
        res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating cart" });
    }
}


export {addToCart,removeFromCart,getCart,updateCartItem}