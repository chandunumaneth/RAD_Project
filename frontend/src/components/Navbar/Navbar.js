import React, { useState } from 'react'
import './Navbar.css'


const Navbar = ( {setShowLogin} ) => {
  return (
    <div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      
    </div>
  )
}

export default Navbar
