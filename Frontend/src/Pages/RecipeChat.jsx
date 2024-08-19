import React, { useState } from 'react'
import ChatBox from '../Components/ChatBox'
import { ChatState } from '../Context/ChatProvider'
import "../Styles/CSS/recipeChat.css"
import { recipeModel } from '../utils/geminiModels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import CheffyLogo from "../assets/CheffyLogo.png"
import axios from 'axios'
import {getAccessToken} from "../utils/jwt.auth.util"

const RecipeChat = () => {
  const { recipeMessages, setRecipeMessages } = ChatState()
  const [newMessage, setNewMessage] = useState("")

  const chat = async (message) => {
    const chatInstance = recipeModel.startChat({ history: recipeMessages })
    const result = await chatInstance.sendMessage(message)
    const modelMessage = { role: "model", parts: [{ text: result.response.text() }] }
    setRecipeMessages((prevMessages) => [...prevMessages, modelMessage])
    updateChat(modelMessage)
  }

  const handleSubmit = async () => {
    if (newMessage.trim()) {
      const userMessage = { role: "user", parts: [{ text: newMessage }] }
      setRecipeMessages((prevMessages) => [...prevMessages, userMessage])
      setNewMessage('')
      await chat(newMessage)
      updateChat(userMessage)
    }
  }

  const updateChat = async (message) => {
    const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/update-chat`
    const username = localStorage.getItem("username")

    const data = {
      username: username,
      chat: message,
      type:"recipeSuggestionChat"
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
    <div className='recipeChat'>
      <div className='recipeTitleBar'>
        <img src={CheffyLogo} alt="" className='cheffyLogo' />
      </div>
      <div className='recipeChatContainer'>
        <div className='recipeChatBox'>
          <ChatBox messages={recipeMessages} greetText={`Let's turn those ingredients into a feast! 🍲✨`} />
        </div>
        <div className="senderContainer">
          <div className="inputContainer">
            <textarea
              placeholder={`Tell us those ingredients... and let's whip up a culinary masterpiece! 🍳👩‍🍳👨‍🍳`}
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

export default RecipeChat
