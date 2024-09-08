import React, { useState } from 'react';
import './exploreMenu.css';
import { menu_list } from '../../assets/assets';

function ExploreMenu({ category, setCategory }) {
    const [startIndex, setStartIndex] = useState(0);
    const itemsToShow = 4;

    const handleNext = () => {
        const scrollContainer = document.querySelector('.exploreMenu_list');
        if (startIndex + itemsToShow < menu_list.length) {
            setStartIndex((prev) => prev + itemsToShow);
            scrollContainer.scrollTo({
                left: scrollContainer.clientWidth * (startIndex + itemsToShow),
                behavior: 'smooth',
            });
        }
    };

    const handlePrev = () => {
        const scrollContainer = document.querySelector('.exploreMenu_list');
        if (startIndex - itemsToShow >= 0) {
            setStartIndex((prev) => prev - itemsToShow);
            scrollContainer.scrollTo({
                left: scrollContainer.clientWidth * (startIndex - itemsToShow),
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className='exploreMenu' id='exploreMenu'>
            <h1 className='title'>Explore our menu</h1>
            <p className="exploreMenu_text">
                Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
            </p>
            <div className="exploreMenu_list">
                <button className="arrow arrow-left" onClick={handlePrev} disabled={startIndex === 0}>
                    &lt; {/* Left arrow */}
                </button>
                {menu_list.slice(startIndex, startIndex + itemsToShow).map((item, index) => (
                    <div 
                        onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
                        key={index} 
                        className="exploreMenu_list_item"
                    >
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
                <button className="arrow arrow-right" onClick={handleNext} disabled={startIndex + itemsToShow >= menu_list.length}>
                    &gt; {/* Right arrow */}
                </button>
            </div>
            <hr />
        </div>
    );
}

export default ExploreMenu;
