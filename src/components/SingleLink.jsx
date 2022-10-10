import React from "react";


const Link = ({title, url}) =>{
    return(
        <>
        <a href = {url}>
            <div className="linkContainer">
                <p>{title}</p>
            </div>
        </a>
        </>
    )
}

export default Link