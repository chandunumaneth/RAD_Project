import React, { useContext, useState } from 'react'
import './navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext'

function navbar({setShowLogin}) {

  const [menu,setMenu] = useState("Home")
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext)
  const navigate = useNavigate();

  const logout =()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken("");
    navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbarMenu">
        <Link to='/' onClick={()=>setMenu("Home")} className={menu === "Home"? "active":""}>Home</Link>
        <a href='#exploreMenu' onClick={()=>setMenu("Menu")} className={menu === "Menu"? "active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("MobileApp")} className={menu === "MobileApp"? "active":""}>MobileApp</a>
        <a href='#footer' onClick={()=>setMenu("ContactUs")} className={menu === "ContactUs"? "active":""}>Cotact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-searchicon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          
          <div className={getTotalCartAmount()===0 ? "" : "dot"}> </div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
        :<div className='navbar-profile'>
          <Link to='/profile'><img src={assets.profile_icon} alt="" /></Link>
          
          </div>}
        
      </div>
    </div>
  )
}

export default navbar
