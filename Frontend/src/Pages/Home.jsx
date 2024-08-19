import React from 'react'
import "../Styles/CSS/home.css"
import NavBar from '../Components/NavBar'
import HungerPlate from "../assets/HungerPlate.png"
import WorldMap from "../assets/WorldMap.png"
import MealPlanner from "../assets/MealPlanner.png"
import ExpirationTracker from "../assets/ExpirationTracker.png"
import RecipeSuggestion from "../assets/RecipeSuggestion.png"
import Donation from "../assets/Donation.png"
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="homeContainer">
            <div className="navContainer">
                <NavBar />
            </div>
            <div className="homeContent">
                <div className="homeTopPart">
                    <div className="homeTopText">
                        <div className="homeTitleCard">
                            Welcome to FoodWise🍊
                        </div>
                        <div className="homeMainText">
                            Simplify Your Food, <br />Cut Waste, and<br /> Live Sustainably.
                        </div>
                        <div className="homeSmallText">
                            Manage meals, track expirations, discover recipes, and donate with ease.
                            Join us in reducing waste and supporting a sustainable future. Start today!
                        </div>
                    </div>
                    <div className="homeTopImage">
                        <img src={HungerPlate} alt="" />
                    </div>
                </div>
                <div className="callToActionContainer">
                    <Link to={"/meal-planner"} className="callToAction">
                        <div className="callToActionImage">
                            <img src={MealPlanner} alt="" />
                        </div>
                        <div className="callToActionText">
                            Meal Planner
                        </div>
                    </Link>
                    <Link to={"/expiration-tracker"} className="callToAction">
                        <div className="callToActionImage">
                            <img src={ExpirationTracker} alt="" />
                        </div>
                        <div className="callToActionText">
                            Expiration Tracker
                        </div>
                    </Link>
                    <Link to={"/recipechat"} className="callToAction">
                        <div className="callToActionImage">
                            <img src={RecipeSuggestion} alt="" />
                        </div>
                        <div className="callToActionText">
                            AI Recipe Suggestion
                        </div>
                    </Link>
                    <Link to={"/organisations"} className="callToAction">
                        <div className="callToActionImage">
                            <img src={Donation} alt="" />
                        </div>
                        <div className="callToActionText">
                            Donation
                        </div>
                    </Link>
                </div>
                <div className="mapContainer">
                    <div className="mapText">
                        Make The World A Better Place
                    </div>
                    <div className="mapImage">
                        <img src={WorldMap} alt="" />
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Home
