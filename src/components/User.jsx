import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Profile from './Profile'
import Preload from './Preload'
import UserNotFound from './UserNotFound'




const User = () =>{

    const adminUsername = useSelector((state) => state.user.profile.username)

    const params = useParams()

    const {username} = params

    const [userData, setUserData] = useState({})

    const [links, setLinks] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(null)

    const getUser = async () =>{

        const resp = await fetch(`/api/user/${username}`,{
            method:"GET",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        })

        const respJson = await resp.json()
        if (respJson.success){
            setLoading(false)
            setUserData(respJson.profile)
            return setLinks(respJson.profile.links)
        }
        if (!respJson.success){
            setLoading(false)
            return setError(respJson.message)
        }

        

       
    }


    useEffect(() =>{
        getUser()
    }, [params])

    return(
        <>
        {
            username === adminUsername ?
            <Navigate to = "/admin"/> :
            loading ? 
            <Preload h={"60px"} w = {"60px"} r = {"30px"}/> 
            : error ? <UserNotFound/> :
            <Profile
            userdata={userData}
            links={links}
            />

        }
            
        </>
    )
}

export default User