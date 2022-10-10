import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import "./styles/index.css"
import Signup from './components/Signup'
import Profile from './components/Profile'
import Home from './components/Home'
import User from './components/User'
import Admin from './components/Admin'
import EditProfile from './components/EditProfile'
const App = () =>{
    return(
        <Routes>
            <Route path='/' element = { <Home/>}/>
            <Route path = "/admin" element = {<Admin/>}/>
            <Route path = "/account/editprofile" element = {<EditProfile/>}/>
            <Route path='/:username' element = { <User/>}/>
            <Route path='/account/login' element = { <Login/>}/>
            <Route path='/account/signup' element= {<Signup/>}/>
        </Routes>
       
    )
}

export default App