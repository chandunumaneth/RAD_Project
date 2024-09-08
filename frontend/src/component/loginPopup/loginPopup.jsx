import React, { useContext, useState} from 'react'
import './loginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function loginPopup({setShowLogin}) {
  const navigate = useNavigate();
  const {url,setToken} = useContext(StoreContext)

    const [currentState,setCurrentState] = useState("Login")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = url;
      if (currentState === "Login") {
          newUrl += "/api/user/login";
      } else {
          newUrl += "/api/user/register";
      }
  
      try {
          const response = await axios.post(newUrl, data);
          if (response.data.success) {
              setToken(response.data.token);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("email", response.data.email);
              setShowLogin(false);
              console.log("response", response.data);
              navigate('/profile');
          }
      } catch (error) {
          if (error.response) {
              console.log(error.response.data.message);
              alert(error.response.data.message);
          } else if (error.request) {
              console.log("No response received:", error.request);
          } else {
              console.log("Error:", error.message);
          }
      }
  };

    
  
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="text" placeholder='Password' required />
        </div>
        <button type='submit'>{currentState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState==="Login"
        ?<p>Create a new Account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default loginPopup
