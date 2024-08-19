import React, { useState } from 'react'
import '../Styles/CSS/Auth.css'
import OrgRegister from '../Components/OrgRegister'
import Login from '../Components/Login'
import Register from '../Components/Register'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isOrg, setIsOrg] = useState(false)

  return (
    <div className="AuthPageContainer">
      <div className="AuthTopHeader">
        FoodWise
      </div>
      {
        isOrg ?
          <OrgRegister setIsLogin={setIsLogin} setIsOrg={setIsOrg} />
          :
          (
            isLogin
            ?
            <Login setIsLogin={setIsLogin} setIsOrg={setIsOrg} />
            :
            <Register setIsLogin={setIsLogin} setIsOrg={setIsOrg} />
          )
      }
    </div>
  )
}

export default AuthPage
