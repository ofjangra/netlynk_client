
import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import { authenticateUser } from '../store/slice/userSlice'


const Login = () =>{

    const dispatch = useDispatch()
   

    const authError = useSelector((state) =>state.user.auth.error)

    const formik = useFormik({
        initialValues:{
            username:"",
            password:""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("username is required"),
            password: Yup.string().required("Please enter password")
        }),
        onSubmit: values =>{
            dispatch(authenticateUser(values))
        }
    })
   
    return(
        <>
        <div className='fullScreenContainer'>
            <div className='loginSignup' id = "loginSignup">
                <div className='heroImg'>
                    <img src = "/img/netlynk_logo.svg"
                        alt='logo'/>
                    <h1>One link<br/>for multiple<br/>social links</h1>
                </div>
                <div className='formActions'>
                    <form onSubmit={formik.handleSubmit}>
                        <p style = {{color:"firebrick"}}>{authError}</p>
                        <div className='inputField'>
                        <input type = "text"
                        placeholder='username'
                        name = "username"
                        value={formik.values.username}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        />    
                        {formik.errors.username && formik.touched.username ? <p>{formik.errors.username}</p> : null}
                        </div>
                        <div className='inputField'>
                        <input type = "password"
                        placeholder='password'
                        name = "password"
                        value={formik.values.password}
                        onChange = {formik.handleChange}
                        onBlur = {formik.handleBlur}
                        /> 
                        {formik.errors.password && formik.touched.password ? <p>{formik.errors.password}</p> : null}
                        </div>
                     
                        <button type='submit'>Login</button> 
                       
                       
                    </form>
                    <div className='notAccount'>
                    <p>Do not have an account?</p>
                    <Link to = "/account/signup" className='link'>
                    <strong style={{color: "#00aa88"}}>Signup</strong>
                    </Link>
                        
                    </div>
                       
                </div>
            </div>
        </div>
        </>

    )
}

export default Login