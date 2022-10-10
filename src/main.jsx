import React from 'react'
import reactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "./styles/index.css"
import "./styles/Profile.css"
import "./styles/CreateLink.css"
import "./styles/Home.css"
import "./styles/EditProfile.css"
import "./styles/Preload.css"


import App from './App'

const root = reactDom.createRoot(document.querySelector('.root'))

root.render(
  
    <BrowserRouter>
         <App/>
    </BrowserRouter>
   
 
)