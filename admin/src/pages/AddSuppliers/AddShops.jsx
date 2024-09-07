import React, { useState } from 'react';
import './AddShops.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const AddShops = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        address: "",
        rating: "5"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("address", data.address);
        formData.append("rating", data.rating);
        if (image) {
            formData.append("image", image);
        }
        
        try {
            const response = await axios.post(`${url}/api/shops/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    address: "",
                    rating: "5"
                });
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to add shop. Please try again later.");
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img className='image' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </div>
                <div className="add-shop-name flex-col">
                    <p>Shop Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                </div>
                <div className="add-shop-description flex-col">
                    <p>Shop Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-shop-address flex-col">
                    <p>Shop Address</p>
                    <input onChange={onChangeHandler} value={data.address} type="text" name='address' placeholder='Enter address' required />
                </div>
                <div className="add-rating flex-col">
                    <p>Shop Rating</p>
                    <input onChange={onChangeHandler} value={data.rating} type="number" name='rating' min="1" max="5" placeholder='Enter rating' required />
                </div>
                <button type='submit' className='add-btn'>ADD SHOP</button>
            </form>
        </div>
    );
}

export default AddShops;
