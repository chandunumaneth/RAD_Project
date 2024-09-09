import React from 'react'
import './aboutTimeline.css'
import { assets } from '../../assets/assets'

function aboutTimeline() {
  return (
    <>
    <div className='main-container'>
    <div className='title'>
    <h1>Feeling Hungry? Just Order</h1>
    </div>
    <div className="timeline">
    <div className="container left">
        <div className="content">
        <h2>Search Us</h2>
        <p>Use our simple search feature to find your favorite meals quickly. Filter by dish, restaurant, or cuisine for easy navigation.</p>
        </div>
    </div>
    <div className="container right">
        <div className="content">
        <h2>Select Meal</h2>
        <p>Browse through meal options with detailed descriptions and customer ratings to make the perfect choice for your cravings.</p>
        </div>
    </div>
    <div className="container left">
        <div class="content">
        <h2>Add to Cart</h2>
        <p>Easily add meals to your cart, adjust quantities, and review your order before proceeding to checkout for a seamless experience.</p>
        </div>
    </div>
    <div className="container right">
        <div className="content">
        <h2>Pay and Enjoy</h2>
        <p>omplete your order with secure payment options, and enjoy your meal delivered straight to your door for ultimate convenience.</p>
        </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default aboutTimeline