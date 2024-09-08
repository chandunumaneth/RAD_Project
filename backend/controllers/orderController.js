import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

// Placing user order from frontend without Stripe
const placeOrder = async (req, res) => {
  try {
    // Create a new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,  // Payment will be marked as false initially
      status: 'pending'  // Status will start as 'pending'
    });
    
    // Save the order in the database
    await newOrder.save();
    
    // Clear the user's cart (if applicable)
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Simulate local payment verification (you can add logic to simulate success or failure)
    const isPaymentSuccessful = true;  // Simulate a successful payment

    if (isPaymentSuccessful) {
      // Update order status and payment flag
      await orderModel.findByIdAndUpdate(newOrder._id, { payment: true, status: 'confirmed' });
      res.json({ success: true, message: "Order placed and payment confirmed!" });
    } else {
      // Delete the order if payment fails
      await orderModel.findByIdAndDelete(newOrder._id);
      res.json({ success: false, message: "Payment failed!" });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing the order" });
  }
};

// Verifying the order locally (if needed)
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      // Mark the order as paid
      await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "paid" });
      res.json({ success: true, message: "Order payment confirmed" });
    } else {
      // Delete the order if the payment is unsuccessful
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Order payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying the order" });
  }
};




// user orders for frontend

const userOrders = async (req, res) => {
    try {
      // Extract userId from request headers (or you could use req.body if sent from frontend that way)
      const userId = req.body.userId || req.headers.userId;
  
      // Fetch orders for the specific user
      const orders = await orderModel.find({ userId });
  
      // Check if orders were found
      if (orders.length > 0) {
        res.json({ success: true, data: orders });
      } else {
        res.json({ success: false, message: "No orders found" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error fetching user orders" });
    }
  };

// Listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}