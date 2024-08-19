import React from 'react'
import "../Styles/CSS/navBar.css"
import { Link } from 'react-router-dom';
import NavDropDown from './NavDropDown';

const NavBar = () => {
  const toolsOptions = [
    {
      title: "Cheffy",
      path: "recipechat"
    },
    {
      title: "Meal Planner",
      path: "meal-planner"
    },
    {
      title: "Expiration Tracker",
      path: "expiration-tracker"
    }
  ]

  const userOptions = [
    {
      title: "Account",
      path: "profile"
    },
    {
      title: "Log out",
      path: "log-out"
    }
  ]
  return (
    <div className="navBar">
      <div className="navTitle">
        FoodWise
      </div>
      <div className="navLinks">
        <Link to={"/"}>Home</Link>
        <Link to={"/organisations"}>Organisations</Link>
        <NavDropDown title={"Tools"} menuItems={toolsOptions} />
        <Link to={"/about-us"}>About Us</Link>
        <NavDropDown title={"user"} menuItems={userOptions} />
      </div>
    </div>
  )
}

export default NavBar
