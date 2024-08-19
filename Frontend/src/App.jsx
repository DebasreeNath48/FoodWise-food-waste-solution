import './Styles/CSS/App.css'
import { Route, Routes } from 'react-router-dom'
import LoginLock from './Guard/LoginLock'
import RecipeChat from './Pages/RecipeChat'
import Home from './Pages/Home'
import MealPlanner from './Pages/MealPlanner'
import AboutUs from './Pages/AboutUs'
import ExpirationTracker from './Pages/ExpirationTracker'
import Organisations from './Pages/Organisations'
import AuthPage from './Pages/AuthPage'
import Profile from './Pages/Profile'

function App() {
  return (
    <>
      <Routes>
        <Route path='/registration' element={<LoginLock needLoggedIn={false}><AuthPage/></LoginLock>} />
        <Route path='/' element={<LoginLock needLoggedIn={true}><Home /></LoginLock>} />
        <Route path='/recipechat' element={<LoginLock needLoggedIn={true}><RecipeChat /></LoginLock>} />
        <Route path='/meal-planner' element={<LoginLock needLoggedIn={true}><MealPlanner /></LoginLock>} />
        <Route path='/about-us' element={<LoginLock needLoggedIn={true}><AboutUs /></LoginLock>} />
        <Route path='/expiration-tracker' element={<LoginLock needLoggedIn={true}><ExpirationTracker /></LoginLock>} />
        <Route path='/organisations' element={<LoginLock needLoggedIn={true}><Organisations /></LoginLock>} />
        <Route path='/profile' element={<LoginLock needLoggedIn={true}><Profile /></LoginLock>} />
      </Routes>
    </>
  )
}

export default App
