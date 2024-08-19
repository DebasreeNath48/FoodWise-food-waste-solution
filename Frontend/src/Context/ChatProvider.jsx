import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { getAccessToken } from '../utils/jwt.auth.util';

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [recipeMessages, setRecipeMessages] = useState([]);
    const [mealMessages, setMealMessages] = useState([]);


    const fetchChats = async (type, setMessages) => {
        const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/get-chat`
        const username = localStorage.getItem("username")

        const config = {
            headers: {
                Authorization: `Bearer ${await getAccessToken()}`,
                "Content-type": "application/json"
            }
        }

        try {
            const response = await axios.post(api_url, { username, type }, config)
            if (response.data && response.data.chats) {
                setMessages(JSON.parse(JSON.stringify(response.data.chats)))
            }
        } catch (error) {
            console.error(`Error fetching ${type}:`, error)
        }
    }

    useEffect(() => {
        fetchChats('recipeSuggestionChat', setRecipeMessages)
        fetchChats('mealPlanningChat', setMealMessages)
    }, [])

    return (
        <ChatContext.Provider value={{ recipeMessages, setRecipeMessages, mealMessages, setMealMessages, fetchChats }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider
