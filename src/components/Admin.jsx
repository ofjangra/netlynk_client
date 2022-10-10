import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import Preload from "./Preload";
import CreateLink from "./CreateLink";
import { BorderColor } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from '@mui/icons-material/Link';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import {Clear} from '@mui/icons-material'
import EditLink from "./EditLink";

const Admin = () => {
  const API_endpoint = "http://localhost:5000";

  const front_api = "http://localhost:5173"

  const [userData, setUserData] = useState({});

  const [links, setLinks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalActive, setActive] = useState(false);

  const [error, setError] = useState(null)

  const [vals, setVals] = useState({});

  const [EditModalOpen, setEditModalOpen] = useState(false);

  const [showLink, setShowLink] = useState(false)

  const navigate = useNavigate()

  const openEditModal = (vals) => {
    setVals(vals);
    setEditModalOpen(true);
  };

  const getUser = async () => {

    const tokenPresent = localStorage.getItem("access_token")

    if (!tokenPresent){
       return navigate("/account/login")
    }

    const resp = await fetch(API_endpoint + `/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+tokenPresent
      },
    });

    const respJson = await resp.json();

    if(respJson.error){
      setError(respJson.error)
      return localStorage.clear()
    }
    setUserData(respJson);

    getAllLinks(respJson._id);

  };

  const getAllLinks = async (id) => {
    const resp = await fetch(API_endpoint + `/links/${id}`);

    const respJson = await resp.json();

    setLinks(respJson);
    setLoading(false);
  
  };

  const logout =  () =>{
    localStorage.clear()
    return navigate("/account/login")
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
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
      <CreateLink open={modalActive} onClose={() => setActive(!modalActive)} />
      <EditLink
        open={EditModalOpen}
        onClose={() => setEditModalOpen(!EditModalOpen)}
        linkVals={vals}
      />
      {loading ? (
        <Preload h={"60px"} w={"60px"} r={"30px"} />
      ) : (
        <div className="home_profile">
          <button id = "logout" onClick={() => logout()}>Logout</button>
          {
            showLink ? 
            <div className="profileLink">
            <Clear id = "closeToast" onClick = {()=>setShowLink(false)}/>
            <p>Share Your Profile:</p>
            <p>{`${front_api}/${userData.username}`}</p>
          </div> :
          null
          }
          
          <div className="userProfile">
            <div className="profileDetails">
              <div className="profilePhoto">
                <img src={userData.photo_url} />
              </div>
              <div className="aside_profile">
                <div className="profileName">
                  <h5>{userData.username}</h5>
                  
                 
                </div>

                <p>{userData.bio}</p>
                <p></p>
              </div>
              
            </div>
            

            <div className="editButtons">
              <button onClick={() => setActive(!modalActive)}>
                <AddIcon/>
              </button>
              <button onClick={() => setActive(!modalActive)}>
                    <Link to = "/account/editprofile" style = {{
                    textDecoration:"none",
                    color:"#000"
                    }}>
                      <SettingsIcon/>
                    </Link>
              </button>
              <button onClick = {()=>setShowLink(true)}>
                <LinkIcon/>
              </button>
            </div>
           
          </div>
          <div className="userLinks">
            {links.length == 0 ? (
              <h2>No Links Yet</h2>
            ) : (
              links.map((link) => {
                return (
                  <div style={{position:"relative", width:"100%"}} key={link._id}>
                     <EditIcon
                        id="editlink"
                        onClick={() => openEditModal({title:link.title, url:link.url, id:link._id})}
                      />
                  <a href={link.url}>
                    <div className="linkContainer">
                      <p>{link.title}</p>
                     
                    </div>
                  </a>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
