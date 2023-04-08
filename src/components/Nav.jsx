import { Add, Home,  Settings } from "@mui/icons-material"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Tooltip } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { openModal, logout } from "../store/slice/userSlice";

const Nav = () =>{
    const auth = useSelector((state) => state.user.auth.authenticated)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutUser = () =>{
        dispatch(logout())
       !auth ? navigate("/account/login") : null
    }
    return(
        <>  
        {
        
            <nav className="navbar">
                <ul>
                    <li>
                    
                            <Link to="/admin" className = "icon">
                                <Home />
                            </Link>
    
                    </li>
                    <li onClick={() =>dispatch(openModal(true))}>
                       
                            <Add/>
                    
                    </li>
                    <li>
                  
                        <Link to="/account/editprofile" className = "icon">
                            <Settings/>
                        </Link>
                      
                    </li>
                    <li onClick={() => logoutUser()}>
                       
                            <LogoutIcon/>

                    </li>
                </ul>
            </nav>
}
        </>
    )
}


export default Nav