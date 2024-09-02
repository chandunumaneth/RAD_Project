import React, { useState } from 'react'
import './LoginPopup.css'
import cross_icon from '../../assets/cross_icon.png'

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrState] = useState("Log In")

    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img className='cross-icon' onClick={()=>setShowLogin(false)} src={cross_icon} alt=""/>
                </div>
                <div className='login-popup-inputs'>
                    {currState==="Log In"?<></>:<input type='text' placeholder='Your Name' required/>}
                    <input type='email' placeholder='Your Email' required/>
                    <input type='password' placeholder='Password' required/>
                </div>
                    <button>{currState==="Sign Up"?"Create Account":"Log In"}</button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required/>
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>    

                {currState === "Log In"
                ? <p>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Sign Up</span></p>
                : <p>Already having an account? <span onClick={() => setCurrState("Log In")} >Log In</span></p> 
                }
                    
            </form>
        </div>
    )
}

export default LoginPopup