import React, {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import Preload from './Preload'

const API_endpoint = "http://localhost:5000"

const EditProfile = () =>{
    const [loading, setLoading] = useState(true)
    
    const navigate = useNavigate()

    useEffect(()=>{
        getUserData()
    }, [])

    

    const [error, setError] = useState(null)


    const inputRef = useRef(null)

    const fileRefClick = () =>{
        inputRef.current.click()
    } 

    const handleFileChange = (e) =>{

        let file = e.target.files[0]
        const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = () =>{
                setImage(reader.result)
            }
    }


    const [image, setImage] = useState(null)

    const [updateError, setUpdateError] = useState(null)

   const formik = useFormik({
    initialValues:{
        username:"",
        email:"",
        bio:""
    }
   })

  

    const getUserData = async () =>{
        const tokenPresent = localStorage.getItem("access_token")

        if (!tokenPresent){
            return navigate("/account/login")
        }
        const resp = await fetch(API_endpoint+'/profile', {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + tokenPresent
            },
            credentials:'include'
        })

        const respJson = await resp.json()
        // console.log(respJson)

        if (respJson.error){
            setError(respJson.error)
            return localStorage.clear()
        }
        formik.setValues({
            username:respJson.username,
            email:respJson.email,
            bio:respJson.bio,
        })
        setImage(respJson.photo_url)

        setLoading(false)

    }


  


    //// update profile details _______________________

    const updateProfile = async () =>{
        try{
        setLoading(true)

        const updateProfileResp = await fetch(API_endpoint+"/editprofile", {
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("access_token")
            },
            body: JSON.stringify({
                username:formik.values.username,
                email:formik.values.email,
                bio:formik.values.bio,
            }),
            credentials:"include"
        })
        const updateProfileRespJson = await updateProfileResp.json()
        console.log(updateProfileRespJson)
        if(updateProfileRespJson.error){
            setLoading(false)
           return setUpdateError(updateProfileRespJson.error)
        }
        if(updateProfileRespJson.message){
            return setLoading(false)
        }
        } catch(err){
            
        }
    }


    /// update profile photo _________________________ 



    const updateProfilePhoto = async () =>{
        setLoading(true)
        const data = new FormData()
        data.append('file', image)
        data.append("upload_preset", "instaclone")
        data.append("cloud_name","ofjangra")
       const cloudinaryResp = await fetch("https://api.cloudinary.com/v1_1/ofjangra/image/upload",{
            method:"POST",
            body: data
        })
        const cloudinaryRespJson = await cloudinaryResp.json()
        const cloudRespImageUrl = await cloudinaryRespJson.url

        const updatePhotoResp = await fetch(API_endpoint+'/editprofile/photo',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                photo_url:cloudRespImageUrl
            }),
            credentials:"include",
            
        })
        if(updatePhotoResp.status == 200){
            setLoading(false)
        }

    }

    return(
        error ? 
    <div style = {{position:"absolute", 
    top:"50%", left:"50%", 
    transform:"translate(-50%, -50%)", 
    display:"flex",
    flexDirection:"column",
    alignItems:"center", 
    justifyContent:"center"}}>
      <h2>{error}</h2>
      <Link to = "/account/login"
      style = {{
        color:"#00aa88",
        textDecoration:"none"
      }}
      >Login again</Link>
    </div> :
        <>
        { loading ? <Preload h={"60px"} w = {"60px"} r = {"30px"}/> : 
            <div className='editProfile_wrapper'>
                <h3>Edit Profile</h3>
                <div className='editProfile'>
                    <div className='editField'>
                        <label htmlFor='image_editField'>Profile Photo</label>
                        <div className='image_editField' id = "image_editField">
                            <div className='profile_Photo'>
                                <img src = {image} alt = "profile Photo"/>
                            </div>
                            <input type = "file"
                            onChange={handleFileChange}
                            ref = {inputRef}
                            style ={{display:"none"}}
                            />
                            <div className='flex' style = {{
                                display:"flex", 
                                flexDirection:"column",
                                alignItems:"flex-start",
                                justifyContent:"space-around"
                                }}>
                            <button onClick = { fileRefClick} style = {{marginBottom:"10px"}}>New Photo</button>
                            <button style={{marginTop:"10px"}} onClick= {updateProfilePhoto}>Save Photo</button>
                            </div>
                        </div>
                    </div>
                   
                    <div className='editField'>
                        <label htmlFor='username_editField'>Username</label>
                        <div className='username_editField' id = "username_editField">
                            <div className='text_editField'>
                                <input type = "text"
                                value={formik.values.username}
                                name="username"
                                onChange={formik.handleChange}
                                onBlur = {formik.handleBlur}
                                />
                            </div>
                            {updateError === "Username already taken" ? <p style={{color:"firebrick"}}>{updateError}</p> : null}
                        </div>
                    </div>
                 
                    <div className='editField'>
                        <label htmlFor='email_editField'>email No.</label>
                        <div className='email_editField' id = "email_editField">
                            <div className='text_editField'>
                                <input type = "email"
                                value={formik.values.email}
                                name="email"
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                                />
                            </div>
                            {updateError === "Email already taken" ? <p style={{color:"firebrick"}}>{updateError}</p> : null}
                        </div>
                    </div>

                    <div className='editField'>
                        <label htmlFor='bio_editField'>Bio</label>
                        <div className='bio_editField' id = "bio_editField">
                            <div className='text_editField'>
                                <textarea
                                name = "bio"
                                value = {formik.values.bio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                            </div>
                        </div>
                    </div>

                    <button onClick={updateProfile}>Save Profile</button>
                </div>
            </div>
        }
        </>
    )
}



export default EditProfile