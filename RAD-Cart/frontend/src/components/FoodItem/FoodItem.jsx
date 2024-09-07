import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

function FoodItem ({id,name,price,description,image}) {
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
  
  
  
  
  
  // **********************NEW********************Determine if the item is already in the cart
  const isInCart = cartItems[id] > 0;

  // Function to handle button click
  const handleButtonClick = () => {
      if (cartItems[id]) {
          // Increment the quantity if it's already in the cart
          updateCartItem(id, cartItems[id] + 1);
      } else {
          // Add the item to the cart if it's not there
          addToCart(id);
      }
  };

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            <button onClick={handleButtonClick} className={`add-to-cart-button ${isInCart ? 'add-more' : ''}`}>
              {isInCart ? `Add More` : 'Add to Cart'}
            </button>
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p className='namewe'>{name}</p>
                <img className='ratingstars' src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem