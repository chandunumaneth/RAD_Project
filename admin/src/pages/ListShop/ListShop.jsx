import React, { useEffect, useState } from 'react';
import './ListShop.css';
import axios from "axios";
import { toast } from "react-toastify";

const ListShop = ({ url }) => {
  const [list, setList] = useState([]);
  const [rating, setRating] = useState({});

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/shops/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching shop list");
    }
  };

  const updateRating = async (shopId, newRating) => {
    try {
      const response = await axios.post(`${url}/api/shops/update-rating`, { id: shopId, rating: newRating });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the list to reflect updated ratings
      } else {
        toast.error("Error updating rating");
      }
    } catch (error) {
      toast.error("Error updating rating");
    }
  };

  const removeShop = async (shopId) => {
    const response = await axios.post(`${url}/api/shops/remove`, { id: shopId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error removing shop");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Shops List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Address</b>
          <b>Rating</b>
          <b>Action</b>
        </div>
        {/* {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.address}</p>
              <p>{item.rating}</p>
              <p onClick={() => removeShop(item._id)} className='cursor action-button'>Remove</p>
            </div>
          );
        })} */}
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.address}</p>
            <p>
              <input
                type="number"
                min="1"
                max="5"
                value={rating[item._id] || item.rating}
                onChange={(e) => setRating({ ...rating, [item._id]: e.target.value })}
              />
              <button onClick={() => updateRating(item._id, rating[item._id])}>Update Rating</button>
            </p>
            <p onClick={() => removeShop(item._id)} className='cursor action-button'>Remove</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListShop;