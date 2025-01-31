import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

function footer() {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-right">
            <h2>Contact Us</h2>
            <ul>
                <li>+94 71 369 0673</li>
                <li>example@gmail.com</li>
            </ul>
        </div>
        <div className="footer-content-center">
            <h2>Branch</h2>
            
            <ul>
                <li>Maharagama</li>
                <li>Homagama</li>
                <li>Kandana</li>
                <li>Kohuwala</li>
            </ul>
        </div>
        <div className="footer-content-left">
            <img src={assets.logo} alt="" className='logo'/>
            <p>ExpressFoods By NHP</p>
            <div className="footer-social-icon">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ Expressfoods.com- All Right Reserved.</p>
    </div>
  )
}

export default footer
