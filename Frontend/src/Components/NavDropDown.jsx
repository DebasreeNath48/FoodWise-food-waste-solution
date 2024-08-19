import React, { useState } from 'react';
import '../Styles/CSS/navDropDown.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { getRefreshToken, setAccessToken, setRefreshToken } from '../utils/jwt.auth.util';

const NavDropDown = ({ title, menuItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const navigate = useNavigate()

  const handleLogout = async () => {
    const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/logout`
    try {
      const response = await axios.post(api_url, {}, {
        headers: {
          "Content-type": "application/json",
          'Authorization': `bearer ${getRefreshToken()}`
        }
      })
      setAccessToken('')
      setRefreshToken('')
      localStorage.removeItem("username")

      navigate("/registration")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="navbar-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {title !== "user" && title}
      {title === "user" && <FaUserCircle fontSize={"40px"} />}
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {menuItems.map((item, index) => (
            item.title === "Log out" ? (
              <div key={index} className="dropdown-item" onClick={handleLogout}>
                {item.title}
              </div>
            ) : (
              <Link to={"/" + item.path} key={index} className="dropdown-item">
                {item.title}
              </Link>
            )
          ))}

        </div>
      )}
    </div>
  );
};

export default NavDropDown;
