



const Profile = ({userdata, links}) => {

  
  return (
    <>
        <div className="home_profile">
          <div className="userProfile">
            <div className="profileDetails">
              <div className="profilePhoto">
                <img src={userdata.photo_url} />
              </div>
              <div className="aside_profile">
                <div className="profileName">
                <h5>{userdata.name}</h5>
                  <h3>{userdata.username}</h3>
                </div>
                <p>{userdata.bio}</p>
              </div>
            </div>
          </div>
          <div className="userLinks">
            {links.length == 0 ? (
              <h2>No Links Yet</h2>
            ) : (
              links.map((link) => {
                return (
                  

                  <div className="linkContainer" key={link._id}>
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

export default Profile;
