import React, { useState, useEffect } from "react";
import { BorderColor } from "@mui/icons-material";
import CreateLink from "./CreateLink";
import Link from "./SingleLink";


const Profile = ({userdata, links}) => {

  const [modalActive, setActive] = useState(false);
  
  return (
    <>
      <CreateLink open={modalActive} onClose={() => setActive(!modalActive)} />
      <div className="home_profile">
        <div className="userProfile">
          <div className="profileDetails">
            <div className="profilePhoto">
              <img src={userdata.photo_url} />
            </div>
            <div className="aside_profile">
              <div className="profileName">
                <h5>{userdata.username}</h5>
              </div>
             
            <p>{userdata.bio}</p>
        
            </div>
          </div>
        </div>
        <div className="userLinks">
          {
            links.length == 0 ?
            <h2>No Links Yet</h2>
            :
            links.map((link) =>{
              return(
                <Link
                key={link._id} 
                title={link.title}
                url={link.url}/>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Profile;
