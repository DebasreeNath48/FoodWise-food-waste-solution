import React from 'react';
import '../Styles/CSS/aboutUs.css';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';

const AboutUs = () => {
    return (
        <div className='aboutUsContainer'>
            <div className="navContainer">
                <NavBar />
            </div>
            <div className="aboutUsMainContainer">
                <div className="aboutUsContent">
                    <h1 className="aboutUsTitle">About Us</h1>
                    <p className="aboutUsText">
                        FoodWise is an innovative platform designed to address the critical issue of food waste
                        by helping individuals and households manage their food consumption more effectively.
                        By incorporating features such as meal planning, expiration tracking, recipe suggestions,
                        and donation coordination, FoodWise aims to reduce food waste, support local food banks,
                        and contribute to global efforts in achieving the Sustainable Development Goals (SDGs),
                        particularly Goal 2 (Zero Hunger) and Goal 12 (Responsible Consumption and Production).
                    </p>
                    <p className="aboutUsText">
                        Despite increased awareness of food waste and its environmental and economic impacts,
                        many households struggle to manage their food efficiently, leading to significant waste.
                        This project seeks to address these challenges by providing a user-friendly platform that
                        helps users plan meals, track food expiration dates, find recipes based on available
                        ingredients, and connect with local food banks for donations.
                    </p>
                    <p className="aboutUsText">
                        The core objectives of FoodWise are to reduce food waste, support food donation,
                        promote sustainable consumption, and contribute to zero hunger. Join us in our mission
                        to make a positive impact on the world, one meal at a time.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;
