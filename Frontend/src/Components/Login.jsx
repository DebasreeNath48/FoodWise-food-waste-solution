import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../Styles/CSS/Login.css'
import FoodShortage from "../assets/FoodHunger.jpg"
import { setAccessToken, setRefreshToken } from '../utils/jwt.auth.util'

const Login = ({ setIsLogin, setIsOrg }) => {
    const [isShow, setIsShow] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleShowPassword = () => {
        setIsShow(!isShow)
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/login`
        const data = {
            username: username,
            password: password
        }

        try {
            const response = await axios.post(api_url, data, {
                headers: {
                    "Content-type": "application/json",
                }
            })
            setAccessToken(response.data.accessToken)
            setRefreshToken(response.data.refreshToken)
            localStorage.setItem("username", response.data.username)

            navigate("/")
        } catch (error) {
            console.error("User not found. Wrong username or password.")
        }
    }

    return (
        <div className="loginInnerContainer">
            <div className="loginPageContainerWrapper">
                <div className="loginLeftContent">
                    <img src={FoodShortage} alt="" />
                </div>
                <div className="loginRightContent">
                    <div className="loginPageContent">
                        <h1 className='loginHeader'>Login</h1>
                        <form onSubmit={submitHandler}>
                            <div className="loginEmailInput">
                                <label htmlFor="username">Username</label>
                                <div className="loginEmailInputField">
                                    <input 
                                        type="text" 
                                        id='username' 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="loginPasswordInput">
                                <label htmlFor="password">Password</label>
                                <div className="loginPasswordInputField">
                                    <input 
                                        type={isShow ? "text" : "password"} 
                                        id="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                    {isShow 
                                        ? <FaEye size={20} className='cursor-pointer' onClick={handleShowPassword} /> 
                                        : <FaEyeSlash size={20} className='cursor-pointer' onClick={handleShowPassword} />
                                    }
                                </div>
                            </div>
                            <div className="loginButton">
                                <button type="submit">Login</button>
                            </div>
                        </form>
                        <div className='loginCreateNew'>
                            <p>Don't have an Account?
                                <span
                                    onClick={() => {
                                        setIsLogin(false)
                                        setIsOrg(false)
                                    }}
                                >Register Now</span></p>
                        </div>
                    </div>
                    <div className='loginOrgLogin'>
                        <button
                            onClick={() => {
                                setIsLogin(false)
                                setIsOrg(true)
                            }}
                            className='loginOrgRegister'>Organization
                            Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
