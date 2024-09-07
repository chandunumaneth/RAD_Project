import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, default: 5 },
    image: { type: String }
});

const shopModel = mongoose.model('Shop', shopSchema);

export default shopModel;
