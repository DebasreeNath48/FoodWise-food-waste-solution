import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/CSS/profile.css';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { getAccessToken } from '../utils/jwt.auth.util';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    name: '',
    email: ''
  });

  // Fetch user profile from the backend
  const fetchUserProfile = async () => {
    const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/profile`;

    const config = {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-type": "application/json"
      },
    };

    try {
      const response = await axios.get(api_url, config);
      if (response.data) {
        setUserProfile({
          username: response.data.username,
          name: response.data.name,
          email: response.data.email
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <div className="navContainer">
        <NavBar />
      </div>
      <div className='userProfileContainer'>
        <h1 className='profileTitle'>User Profile</h1>
        <div className='profileField'>
          <div className='fieldLabel'>Username:</div>
          <div className='fieldValue'>{userProfile.username}</div>
        </div>
        <div className='profileField'>
          <div className='fieldLabel'>Name:</div>
          <div className='fieldValue'>{userProfile.name}</div>
        </div>
        <div className='profileField'>
          <div className='fieldLabel'>Email:</div>
          <div className='fieldValue'>{userProfile.email}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
