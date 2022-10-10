import React from "react";
import { Link } from 'react-router-dom'

const UserNotFound = () =>{
    return(
        <>
            <div className="error" style = {{
                position:"absolute",
                top:"50%",
                left:"50%",
                transform:"translate(-50%,-50%)",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
            }}>
                <h1>User Not Found</h1>
                <Link to = "/admin" style={{
                    color:"#00aa88",
                    textDecoration:"none"
                }}>Back to home</Link>
            </div>
        </>
    )
}

export default UserNotFound