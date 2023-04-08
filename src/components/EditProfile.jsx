import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, activateLoading } from '../store/slice/userSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'


const EditProfile = () =>{
    const error = useSelector((state) => state.user.auth.error)

    const userData = useSelector((state) => state.user.profile)


    const [image, setImage] = useState(null)


    const inputRef = useRef(null)

    const [file, setFile] = useState(null)

    const dispatch = useDispatch()


    useEffect(() =>{
        formik.setValues({
            username:userData.username,
            name:userData.name,
            email:userData.email,
            bio:userData.bio
        })
        setImage(userData.photo_url)
    },[])

  


    const fileRefClick = () =>{
        inputRef.current.click()
    } 

    const handleFileChange = (e) =>{

        let file = e.target.files[0]
        const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = () =>{
                setImage(reader.result)
                setFile(file)
            }
    }


    

   

   const formik = useFormik({
    initialValues:{
        username:"",
        name:"",
        email:"",
        bio:""
    },
    validationSchema:Yup.object({
        username:Yup.string()
        .required('username is required')
        .min(3, 'minimum, 3 characters are required')
        .max(16, 'minimum 16 characters are required')
        .matches(/^[a-zA-Z0-9_-]{3,16}$/igm, "Username can only contain alphabets, numericals, - and _"),
        email:Yup.string().email("Invalid email format").required('Email is required')
    })
   })

  


  


    // update profile details _______________________

    const updateUserProfile = async () =>{
        dispatch(activateLoading(true))
        const formValues = {}
        if (userData.name !== formik.values.name) {
            formValues.name = formik.values.name
        } 
        if (userData.username !== formik.values.username) {
            formValues.username = formik.values.username
        }
        if (userData.email !== formik.values.email) {
            formValues.email = formik.values.email
        } 
        if (userData.bio !== formik.values.bio) {
            formValues.bio = formik.values.bio
        } 


        dispatch(updateProfile(formValues))
    }
   





    const updateProfilePhoto = async () =>{
        if (file == null) {
            return
        }
        const imageRef = ref(storage, `images/${file.name + v4()}`)

        await uploadBytes(imageRef, file)

        const imageUrl = await getDownloadURL(imageRef)

        dispatch(activateLoading(true))

        dispatch(updateProfile({
            photo_url:imageUrl
        }))

    }

    return(
        <>
        
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

                            {
                                !file ?

                                <button style={{marginTop:"10px", opacity:"40%"}}>Save Photo</button> :
                                <button style={{marginTop:"10px"}} onClick= {updateProfilePhoto}>Save Photo</button>
                            }
                            
                            </div>
                        </div>
                    </div>
                   
                    <div className='editField'>
                                <label htmlFor='username_editField'>Username</label>
                                <input type = "text"
                                name="username"
                                id = "username_editField"
                               {...formik.getFieldProps("username")}
                                />
                                {formik.errors.username ? <p>{formik.errors.username}</p> : null}
                                {error === "username already taken" ? <p className='input_error'>{error}</p> : null}
                    </div>
                 

                    <div className='editField'>
                        <label htmlFor='name_editField'>Name</label>
                                <input type = "text"
                                id = "name_editField"
                                name="name"
                                {...formik.getFieldProps("name")}
                                />
                           
                    </div>

                    <div className='editField'>
                        <label htmlFor='email_editField'>Email</label>
                                <input type = "email"
                                name="email"
                                id = "email_editField"
                                {...formik.getFieldProps("email")}
                                />
                                {formik.errors.email ? <p>{formik.errors.email}</p> : null}
                            {error === "email already taken" ? <p className='input_error'>{error}</p> : null}
                    </div>

                    <div className='editField'>
                        <label htmlFor='bio_editField'>Bio</label>
                                <textarea
                                name = "bio"
                                id = "bio_editField"
                                value = {formik.values.bio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                    </div>

                    <button onClick={() => updateUserProfile()}>Save Profile</button>
                </div>
            </div>
    
        </>
    )
}



export default EditProfile