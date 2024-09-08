import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true } // Ensure 'Shop' matches the model name
})


const foodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default foodModel;

