import React from "react";


const Preload = ({h, w, r}) =>{
    return(
        <>
            <div className="preloadContainer">
                <div className="spinner" style = {{height:h, width:w, borderRadius:r}}>
                   
                </div>
            </div>
        </>
    )
}

export default Preload