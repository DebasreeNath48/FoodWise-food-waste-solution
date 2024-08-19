import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Styles/CSS/Login.css';
import FoodShortage from "../assets/FoodHunger.jpg";

const OrgLogin = ({ setIsLogin, setIsOrg }) => {
  const [isShow, setIsShow] = useState(false);
  const [formData, setFormData] = useState({ name: '', password: '' });

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
      const response = await axios.post('/api/organizations/login', formData);
      console.log('Organization logged in:', response.data);
    } catch (error) {
      console.log('Error logging in organization:', error.message);
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
            <h1 className='loginHeader'>Organization Login</h1>
            <div className="loginEmailInput">
              <label htmlFor="name">Name</label>
              <div className="loginEmailInputField">
                <input type="text" id='name' value={formData.name} onChange={handleChange} />
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
              <button type="submit">Login</button>
            </div>
          </form>
          <br />
          <div className='loginOrgRegister'>
            <button
              onClick={() => {
                setIsLogin(false);
                setIsOrg(true);
              }}
              className='loginOrgRegister'>Organization Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgLogin;
