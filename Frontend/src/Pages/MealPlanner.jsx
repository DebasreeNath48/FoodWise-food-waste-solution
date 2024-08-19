import React from 'react'
import { useState } from 'react'
import ChatBox from '../Components/ChatBox'
import { ChatState } from '../Context/ChatProvider'
import "../Styles/CSS/mealPlanner.css"
import { mealModel } from '../utils/geminiModels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { getAccessToken } from '../utils/jwt.auth.util'
import axios from 'axios'

const MealPlanner = () => {
  const { mealMessages, setMealMessages } = ChatState()
  const [newMessage, setNewMessage] = useState("")

  const chat=async (message)=>{
    const chatInstance = mealModel.startChat({ history: mealMessages });
    const result = await chatInstance.sendMessage(message);
    const modelMessage = { role: "model", parts: [{ text: result.response.text() }] }
    setMealMessages((prevMessages) => [
      ...prevMessages,
      modelMessage
    ]);
    updateChat(modelMessage)
  }

  const handleSubmit = async () => {
    if (newMessage.trim()) {
      const userMessage = { role: "user", parts: [{ text: newMessage }] };
      setMealMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');
      await chat(newMessage);
      updateChat(userMessage)
    }
  }

  const updateChat = async (message) => {
    const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/update-chat`
    const username = localStorage.getItem("username")

    const data = {
      username: username,
      chat: message,
      type:"mealPlanningChat"
    }

    const config = {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-type": "application/json"
      },
    };

    try {
      await axios.post(api_url, data, config)
    } catch (error) {
      console.error("Failed to update chat:", error)
    }
  }


  return (
    <div className='mealPlanner'>
      <div className='mealTitleBar'>
        Meal Planner 🤖
      </div>
      <div className='mealPlannerContainer'>
        <div className='mealPlannerBox'>
          <ChatBox messages={mealMessages} />
        </div>
        <div className="senderContainer">
          <div className="inputContainer">
            <textarea 
              placeholder={`Lets plan chief`}
              value={newMessage} 
              onChange={(e) => { setNewMessage(e.target.value) }} 
              className='recipeInput' 
            />
          </div>
          <div className="buttonContainer">
            <button type="submit" onClick={handleSubmit} className='recipeSubmitButton'>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealPlanner