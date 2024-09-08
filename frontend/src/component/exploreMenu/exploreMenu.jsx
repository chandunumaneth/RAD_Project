import React, { useRef } from 'react';
import './exploreMenu.css';
import { menu_list } from '../../assets/assets';

function ExploreMenu({ category, setCategory }) {
  const scrollRef = useRef(null); 
  const itemsToShow = 4; 

  const handleNext = () => {
    if (scrollRef.current) {
      // Scroll by the width of the first item 
      const itemWidth = scrollRef.current.children[0].offsetWidth;
      scrollRef.current.scrollBy({ left: itemWidth * itemsToShow, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      // Scroll back by the width of the first item
      const itemWidth = scrollRef.current.children[0].offsetWidth;
      scrollRef.current.scrollBy({ left: -itemWidth * itemsToShow, behavior: 'smooth' });
    }
  };

  return (
    <div className='exploreMenu' id='exploreMenu'>
      <h1 className='title'>Explore our menu</h1>
      <p className="exploreMenu_text">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="exploreMenu_list" ref={scrollRef}>
        {menu_list.map((item, index) => (
          <div 
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
            key={index} 
            className="exploreMenu_list_item"
          >
            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <button className="arrow arrow-left" onClick={handlePrev} disabled={scrollRef.current && scrollRef.current.scrollLeft === 0}>&lt;</button>
      <button className="arrow arrow-right" onClick={handleNext} disabled={scrollRef.current && scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth}>&gt;</button>
      <hr />
    </div>
  );
}

export default ExploreMenu;
