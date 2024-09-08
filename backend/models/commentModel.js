import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({ 
    productId: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    comment: {type: String, required: true},
})

const commentModel = mongoose.models.comment || mongoose.model("comment", commentSchema)

export default commentModel;