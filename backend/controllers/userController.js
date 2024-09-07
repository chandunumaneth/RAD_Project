import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from "validator"
import mongoose from "mongoose";

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).send({ success: false, message: "Please fill all fields" });
    }

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ success: false, message: "User does not exist" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);

        // If the password does not match
        if (!isMatch) {
            return res.status(400).send({ success: false, message: "Invalid credentials" });
        }

        // If the login is successful, create and send a token (or other data)
        const token = createToken(user._id); // Assuming you have a function to generate a token

        return res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            email: user.email, // Send back additional user data as needed
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Server error" });
    }
};

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({ success:false ,message: "Please fill all fields"})
    }
    try{
        const user = await userModel.findOne({email})

        if(user){
            return res.status(400).json({ success:false ,message: "User already exists"})
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({ success:false ,message: "Invalid email"})
        }

        if(password.length < 6){
            return res.status(400).json({ success:false ,message: "Password must be at least 6 characters"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const User = await newUser.save()
        const token = createToken(User._id)
        res.json({success:true, token, email})


    }catch(error){
        console.log(error)
        res.status(500).json({ success:false, message: "Server error"})
    }
}

const getUser = async (req, res) => {
    const { email } = req.params; 

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user data as the response
        res.status(200).json({
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUser = async (req, res) => {
    const { email } = req.params;
    const { name, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        if(name){
            user.name = name
            console.log(user)
            await user.save()
            res.status(200).send({message: "Name updated successfully"})
        }
        if(password){
            if(password.length < 6){
                return res.status(400).json({message: "Password must be at least 6 characters"})
            }else{
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(password, salt)
                await user.save()
                res.status(200).send({message: "Password updated successfully"})
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({ success:false, message: "Server error"})
    }
}

const deleteUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email});

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }

        await userModel.deleteOne({ email });
        return res.status(200).json({message: "User deleted successfully"})

    }catch(error){
        console.log(error)
        res.status(500).json({ success:false, message: "Server error"})
    }
}

export {loginUser, registerUser, getUser, updateUser, deleteUser}