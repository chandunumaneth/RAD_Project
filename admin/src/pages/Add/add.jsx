import React, { useEffect, useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setImage] = useState(false);
    const [shops, setShops] = useState([]);  // State to hold the list of shops
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
        shopId: ""  // New field to store the selected shop's ID
    });

    // Fetch the list of shops when the component loads
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get(`${url}/api/shops/list`);
                console.log("Response:", response.data);
                if (response.data.success) {
                    setShops(response.data.data);
                } else {
                    toast.error("Error fetching shops");
                    console.log(error)
                }
            } catch (error) {
                console.error("Error fetching shops:", error);
                toast.error("Error fetching shops");
            }
        };

        fetchShops();
    }, [url]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("shopId", data.shopId);  // Include the selected shop ID
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad",
                    shopId: ""  // Reset the shop selection
                });
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding food:", error);
            toast.error("Error adding food");
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img className='image' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>

                {/* Dropdown to select shop */}
                <div className="add-shop flex-col">
                    <p>Select Shop</p>
                    <select className='selectt' onChange={onChangeHandler} name="shopId" value={data.shopId} required>
                        <option value="" disabled>Select a Shop</option>
                        {shops.map((shop) => (
                            <option key={shop._id} value={shop._id}>
                                {shop.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select className='selectt' onChange={onChangeHandler} name="category" value={data.category} required>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input className='inputclasa' onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
}

export default Add;
