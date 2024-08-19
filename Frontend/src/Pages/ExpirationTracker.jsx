import React, { useEffect, useState } from 'react';
import '../Styles/CSS/expirationTracker.css';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { getAccessToken } from '../utils/jwt.auth.util';

const ExpirationTracker = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [foodType, setFoodType] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  // Fetch food items from the backend
  const fetchFoodItems = async () => {
    const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/product/get-products`;    
    const config = {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-type": "application/json"
      },
    };

    try {
      const response = await axios.get(api_url, config);
      if (response.data && response.data.products) {
        setFoodItems(response.data.products.map(product => ({
          ...product,
          expirationDate: new Date(product.expirationDate)
        })));
      }
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  // Add a new food item to the backend
  const handleAddFoodItem = async () => {
    if (foodName && foodType && expirationDate) {
      const newFoodItem = {
        name: foodName,
        type: foodType,
        expirationDate: new Date(expirationDate),
      };

      const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/product/update-products`;
      const username = localStorage.getItem('username');
      
      const config = {
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
          "Content-type": "application/json"
        }
      };

      const data = {
        username,
        product: newFoodItem
      };

      try {
        const response = await axios.post(api_url, JSON.stringify(data), config);
        if (response.data && response.data.products) {
          setFoodItems(response.data.products.map(product => ({
            ...product,
            expirationDate: new Date(product.expirationDate)
          })));
        }
        setFoodName('');
        setFoodType('');
        setExpirationDate('');
      } catch (error) {
        console.error('Error adding food item:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const getStatus = (expirationDate) => {
    const currentDate = new Date();
    const dateDiff = (expirationDate - currentDate) / (1000 * 60 * 60 * 24);

    if (dateDiff < 0) {
      return 'Expired';
    } else if (dateDiff <= 3) {
      return 'Expiring Soon';
    } else {
      return 'Fresh';
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  return (
    <div className='expirationTrackerContainer'>
      <div className="navContainer">
        <NavBar />
      </div>
      <div className="expirationTrackerMainContainer">
        <h1 className="expirationTrackerTitle">Expiration Tracker</h1>
        <div className="formContainer">
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="inputField"
          />
          <input
            type="text"
            placeholder="Food Type"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            className="inputField"
          />
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="inputField"
          />
          <button onClick={handleAddFoodItem} className="addButton">Add Food Item</button>
        </div>
        <table className="foodTable">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Food Type</th>
              <th>Expiration Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.expirationDate.toDateString()}</td>
                <td className={getStatus(item.expirationDate).replace(' ', '').toLowerCase()}>{getStatus(item.expirationDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default ExpirationTracker;
