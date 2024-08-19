import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../Styles/CSS/Login.css'
import FoodShortage from "../assets/FoodHunger.jpg"

const Register = ({ setIsLogin, setIsOrg }) => {
    const [isShow, setIsShow] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleShowPassword = () => {
        setIsShow(!isShow)
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        const api_url = `${import.meta.env.VITE_APP_BACKEND_API}/user/register`
        const data = {
            username: username,
            password: password,
            name: name,
            email: email
        }

        try {
            const response = await axios.post(api_url, data, {
                headers: {
                    "Content-type": "application/json",
                }
            })

            navigate("/")
        } catch (error) {
            console.error("Registration failed.", error.message)
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
                        <h1 className='loginHeader'>Register</h1>
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
                            <div className="loginEmailInput">
                                <label htmlFor="name">Name</label>
                                <div className="loginEmailInputField">
                                    <input 
                                        type="text" 
                                        id='name' 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="loginEmailInput">
                                <label htmlFor="email">Email</label>
                                <div className="loginEmailInputField">
                                    <input 
                                        type="email" 
                                        id='email' 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="loginButton">
                                <button type="submit">Register</button>
                            </div>
                        </form>
                        <div className='loginCreateNew'>
                            <p>Already Have an account?
                                <span
                                    onClick={() => {
                                        setIsLogin(true)
                                        setIsOrg(false)
                                    }}
                                >Login Now</span></p>
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

export default Register
