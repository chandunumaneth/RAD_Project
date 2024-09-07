import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './foodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storeContext';

function FoodItem({ id, name, price, description, image }) {
  const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate(); // Create a navigate function

  const { token } = useContext(StoreContext);

  const handleItemClick = () => {
    // Navigate to the detailed page for this food item
    navigate(`/food/${id}`); 
  };

  return (
    <div className='food-item' onClick={handleItemClick}>
      <div className="food-item-img-container">
        <img className='food-item-img' src={url + "/images/" + image} alt='' />
        {token && (
        !cartItem[id] ? (
           <img className='add' onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_white} alt='' />
        ) : (
          <div className='food-item-counter'>
            <img onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_green} alt="" />
            <p>{cartItem[id]}</p>
            <img onClick={(e) => { e.stopPropagation(); removeFromCart(id); }} src={assets.remove_icon_red} alt="" />
          </div>
        )
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
