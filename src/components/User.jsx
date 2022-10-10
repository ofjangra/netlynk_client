import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Profile from './Profile'
import Preload from './Preload'
import UserNotFound from './UserNotFound'




const User = () =>{

    const API_endpoint = "http://localhost:5000"
    
    const params = useParams()

    const {username} = params

    const [userData, setUserData] = useState({
        user:{},
        user_props:{},
    })

    const [links, setLinks] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(null)

    const getUser = async () =>{

        const resp = await fetch(API_endpoint+`/user/${username}`,{
            method:"GET",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        })

        const respJson = await resp.json()
        if (respJson.error){
            setLoading(false)
            return setError(respJson.error)
        }
        setUserData({
            user:respJson.user,
            user_props:respJson.user_props
        })

        getAllLinks(respJson.user._id)

       
    }

    const getAllLinks = async(id) =>{
        const resp = await fetch(API_endpoint + `/links/${id}`)
    
        const respJson = await resp.json()

       
        setLinks(respJson)
        setLoading(false)
        
      }

    useEffect(() =>{
        getUser()
    }, [params])

    return(
        <>
        {
            loading ? 
            <Preload h={"60px"} w = {"60px"} r = {"30px"}/> 
            : error ? <UserNotFound/> :
            <Profile
            userdata={userData.user}
            links={links}
            />

        }
            
        </>
    )
}

export default User