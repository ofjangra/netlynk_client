import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import "./styles/index.css"
import Signup from './components/Signup'
import { useSelector } from 'react-redux'
import Home from './components/Home'
import User from './components/User'
import Admin from './components/Admin'
import EditProfile from './components/EditProfile'
const Layout = () =>{
    const auth = useSelector((state) => state.user.auth.authenticated)
    return(
        <Routes>
            <Route path='/' element = {auth ? <Navigate to = "/admin"/> : <Home/>}/>
            <Route path = "/admin" element = {auth ? <Admin/> : <Navigate to = "/account/login"/>  }/>
            <Route path = "/account/editprofile" element = {auth ? <EditProfile/> : <Navigate to = "/account/login"/>  }/>
            <Route path='/:username' element = { <User/>}/>
            <Route path='/account/login' element = {!auth ? <Login/> : <Navigate to = "/admin"/>  }/>
            <Route path='/account/signup' element= {!auth ? <Signup/> : <Navigate to = "/admin"/>  }/>
        </Routes>
       
    )
}

export default Layout