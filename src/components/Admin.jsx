import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"

import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from '@mui/icons-material/Link';
import EditLink from "./EditLink";
import { handleEditModal } from "../store/slice/userSlice";

const Admin = () => {


  const userData = useSelector((state) => state.user.profile)
  const editModalOpen = useSelector((state) => state.user.editModalActive)
  const [vals, setVals] = useState({});



  const dispatch = useDispatch()

  const openEditModal = (vals) =>{
    setVals(vals)
    dispatch(handleEditModal(true))
  }

  return (
    <>
    
      <EditLink
        open={editModalOpen}
        onClose={() => dispatch(handleEditModal(false))}
        linkVals={vals}
      />
        <div className="home_profile">
 
          <div className="userProfile">
            <div className="profileDetails">
              <div className="profilePhoto">
                <img src={userData.photo_url} />
              </div>
              <div className="aside_profile">
                <div className="profileName">
                <h5>{userData.name}</h5>
                  <h3>{userData.username}</h3>
                  
                 
                </div>

                <p>{userData.bio}</p>
              </div>
              
            </div>
            

  
              <div style = {{
                lineHeight:"28px",
                display:"flex",
                alignItems:"center",
                justifyContent:"space-around"
              }}><LinkIcon style = {{
                marginRight:"10px",
                marginBottom:"-2px"
              }}/> netlynk.onrender.com/{userData.username}</div>
           
          </div>
          <div className="userLinks">
            {userData.links.length == 0 ? (
              <h2>No Links Yet</h2>
            ) : (
              userData.links.map((link) => {
                return (
                  <div className="linkContainer" key={link._id}>
                    <EditIcon
                        id="editlink"
                        onClick={() => openEditModal({title:link.title, url:link.url, id:link._id})}
                      />
                  <a href={link.url}>
                      {link.title}
                  </a>
                  </div>
                );
              })
            )}
          </div>
        </div>
      
    </>
  );
};

export default Admin;
