import React, { useContext } from 'react';
import './foodDisplay.css';
import { StoreContext } from '../../context/storeContext';
import FoodItem from '../foodItem/foodItem';

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2 className='food-display-title'>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem 
                key={index} 
                id={item._id} 
                name={item.name}  
                description={item.description} 
                price={item.price} 
                image={item.image} 
                shopName={item.shop} 
              />
            );
          }
          return null; // Add return null for items that do not match
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
