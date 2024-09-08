import React, { useContext, useEffect, useState } from 'react';
import './placeOrder.css';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {

  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  // State for payment information
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  };

  // Payment form handler
  const onPaymentChangeHandler = (event) => {
    const { name, value } = event.target;
    setPaymentInfo(paymentInfo => ({ ...paymentInfo, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    const userId = localStorage.getItem("userId");
    let orderData = {
      userId: userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    
    if (response.data.success) {

      const { cardNumber, expiryDate, cvv } = paymentInfo;
      if (cardNumber && expiryDate && cvv) {

        alert("Payment successful! Your order has been placed.");
        window.location.replace("/profile");  
      } else {
        alert("Please enter valid payment details.");
      }
    } else {
      alert("Error: " + response.data.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div> 
      
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>Rs.{getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>

          {/* Payment Information Section */}
          <div className="payment-info">
            <h2>Payment Information</h2>
            <input required name='cardNumber' onChange={onPaymentChangeHandler} value={paymentInfo.cardNumber} type="text" placeholder='Card Number' />
            <input required name='expiryDate' onChange={onPaymentChangeHandler} value={paymentInfo.expiryDate} type="text" placeholder='Expiry Date (MM/YY)' />
            <input required name='cvv' onChange={onPaymentChangeHandler} value={paymentInfo.cvv} type="text" placeholder='CVV' />
          </div>

          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form> 
  );
}

export default PlaceOrder;
