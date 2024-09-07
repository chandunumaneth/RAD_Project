import React from 'react'
import './exploreMenu.css'
import {menu_list} from '../../assets/assets'

function exploreMenu({category,setCategory}) {
  return (
    <div className='exploreMenu' id='exploreMenu'>
      <h1>Explore our menu</h1>
      <p className="exploreMenu_text">Choose from a diverse menu featuring a delectable array of dishes.Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>
      <div className="exploreMenu_list">
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev === item.menu_name?"All":item.menu_name)} key={index} className="exploreMenu_list_item">
                    <img className={category==item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr/>
    </div>
  )
}

export default exploreMenu
