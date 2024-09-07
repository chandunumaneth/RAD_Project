import commentModel from "../models/commentModels.js";
import userModel from "../models/userModels.js";

const addComment = async (req, res) => {
    const { productId, email, comment } = req.body;

    try {
        const user = await userModel.findOne({ email });

        // If user not found, return an error response
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const newComment = new commentModel({
            productId,
            name: user.name,
            email: user.email,
            comment
        });

        await newComment.save();

        // Send a success response with the comment and user's name
        res.status(201).json({
            message: "Comment added successfully",
            comment: {
                productId: newComment.productId,
                name: user.name, 
                email: newComment.email,
                comment: newComment.comment,
            }
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    const { productId, email, comment } = req.body;

    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({ message: "User not found"})
        }
        const updateComment = await commentModel.findOneAndUpdate(
            {productId, email}, 
            { $set: {comment: comment}}, 
            {new: true})

        if(!updateComment){
            return res.status(400).json({ message: "Comment not found"})
        }

        return res.status(200).json({"message": "Comment updated successfully"})
    }catch(error){
        res.status(500).json({ message: error.message}) 
    }
}


const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    console.log(commentId)

    if(!commentId){
        return res.status(400).json({ message: "Comment not found"})
    }

    try{
        const deleteComment = await commentModel.findByIdAndDelete(commentId)
        
        if(!deleteComment){
            return res.status(404).json({ message: "Comment not deleted"})
        }
        return res.status(200).json({ message: "Comment deleted successfully"})
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

const getComments = async (req, res) => {
    const productId = req.params.productId;
    try {
        const comments = await commentModel.find({ productId });

        //set used to remove duplicate emails
        const emails = [...new Set(comments.map(comment => comment.email))];
        //find user by email
        const users = await userModel.find({ email: { $in: emails } }).select('email name');

        const nameMap = users.reduce((acc, user) => {
            acc[user.email] = user.name;
            return acc;
        }, {});

        // Add the user's name to each comment
        const commentsWithNames = comments.map(comment => ({
            ...comment._doc, 
            name: nameMap[comment.email] || 'Unknown', 
        }));

        res.status(200).json(commentsWithNames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addComment, deleteComment, getComments, updateComment };