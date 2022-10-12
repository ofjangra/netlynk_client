import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Home = () =>{

  const navigate = useNavigate()

  useEffect(() => {
    const tokenPresent = localStorage.getItem("access_token");
    if (tokenPresent) {
      navigate("/admin");
    }
  }, []);
  
    return(
        <>
            <div className="home">
                <div className="home_content">
                  <div className="intro">
                    <img src = "/img/netlynk_logo.svg" alt = "logo"/>
                    <h1>Welcome to Netlynk</h1>
                  </div>
                  <div className="introActions">
                    <Link to = "/account/login" className="link">
                        Signin
                    </Link>
                    
                    <p>or</p>
                    <Link to = "/account/signup" className="link">
                        Signup
                    </Link>
                    
                  </div>
                </div>
            </div>
        </>
    )
}

export default Home