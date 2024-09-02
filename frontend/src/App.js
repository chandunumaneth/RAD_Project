import React, { useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup.js'
import './App.css'
import Navbar from './components/Navbar/Navbar.js'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
        {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
  
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        
      </div>
    </>
  )
}

export default App
