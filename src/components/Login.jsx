
import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const API_endpoint = "http://localhost:5000"


const Login = () =>{

    const navigate = useNavigate()

    useEffect(()=>{
        const tokenPresent = localStorage.getItem("netlynk_jwt")
        if(tokenPresent){
            return navigate("/admin")
        }
    }, [])

   

    const [error, setError] = useState("")
    const signin = async (body) =>{
        try{
        const resp = await fetch(API_endpoint + "/signin", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                
            },
            body:JSON.stringify(body),
            credentials:'include',
            
        })

        const respJson = await resp.json()

        if (respJson.error){
            return setError(respJson.error)
        }

        localStorage.setItem("access_token", respJson.token)

        return navigate("/admin")
    } catch(err){
        console.log(err)
    }
    }

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
            signin(values)
        }
    })
   
    return(
        <>
        <div className='fullScreenContainer'>
            <div className='loginSignup' id = "loginSignup">
                <div className='heroImg'>
                    <img src = "/img/netlynk_logo.svg"
                        alt='logo'/>
                    <h1>One link<br/>for your all<br/>social links</h1>
                </div>
                <div className='formActions'>
                    <form onSubmit={formik.handleSubmit}>
                        <p>{error}</p>
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