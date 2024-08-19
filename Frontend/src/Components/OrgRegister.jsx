import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import '../Styles/CSS/Login.css'
import FoodShortage from "../assets/FoodHunger.jpg"
import axios from 'axios'; // Ensure axios is installed and imported

const OrgRegister = ({ setIsLogin, setIsOrg }) => {
  const [isShow, setIsShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    about: '',
    type: '',
    address: '',
    password: ''
  });

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/org/create`;
      const response = await axios.post(api_url, formData,{headers: {
        "Content-type": "application/json",
    }});
      console.log('Organization created:', response.data);

      //handle

      
    } catch (error) {
      console.log('Error creating organization:',error.message);
    }
  };

  return (
    <div className="loginInnerContainer">
      <div className="loginPageContainerWrapper">
        <div className="loginLeftContent">
          <img src={FoodShortage} alt="" />
        </div>
        <div className="loginRightContent">
          <form onSubmit={handleSubmit} className="loginPageContent">
            <h1 className='loginHeader'>Organization Register</h1>
            <div className="loginEmailInput">
              <label htmlFor="name">Name</label>
              <div className="loginEmailInputField">
                <input type="text" id='name' value={formData.name} onChange={handleChange} />
              </div>
            </div>
            <div className="loginEmailInput">
              <label htmlFor="email">Email</label>
              <div className="loginEmailInputField">
                <input type="email" id='email' value={formData.email} onChange={handleChange} />
              </div>
            </div>
            <div className="loginEmailInput">
              <label htmlFor="phoneNo">PhoneNo</label>
              <div className="loginEmailInputField">
                <input type="number" id='phoneNo' value={formData.phoneNo} onChange={handleChange} />
              </div>
            </div>
            <div className="loginEmailInput">
              <label htmlFor="about">About</label>
              <div className="loginEmailInputField">
                <input type="text" id='about' value={formData.about} onChange={handleChange} />
              </div>
            </div>
            <div className="loginEmailInput">
              <label htmlFor="type">Type</label>
              <div className="loginEmailInputField">
                <input type="text" id='type' value={formData.type} onChange={handleChange} />
              </div>
            </div>
            <div className="loginEmailInput">
              <label htmlFor="address">Address</label>
              <div className="loginEmailInputField">
                <input type="text" id='address' value={formData.address} onChange={handleChange} />
              </div>
            </div>
            <div className="loginPasswordInput">
              <label htmlFor="password">Password</label>
              <div className="loginPasswordInputField">
                <input type={isShow ? "text" : "password"} id="password" value={formData.password} onChange={handleChange} />
                {isShow ? <FaEye size={20} className='cursor-pointer' onClick={handleShowPassword} /> : <FaEyeSlash size={20} className='cursor-pointer' onClick={handleShowPassword} />}
              </div>
            </div>
            <div className="loginButton">
              <button type="submit">Register</button>
            </div>
          </form>
          <br />
          <div className='loginOrgLogin'>
            <button
              onClick={() => {
                setIsLogin(true)
                setIsOrg(false)
              }}
              className='loginOrgRegister'>User
              Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgRegister;
