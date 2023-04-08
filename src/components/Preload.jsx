


const PreLoad = () =>{
    return(
        <>
            <div style = {{
                height:"100vh",
                minHeight:"590px",
                width:"100%",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                position:"fixed",
                top:"0",
                left:"0",
                zIndex:'20',
                backgroundColor:"#fff"
            }}>
                <img src = "/public/spinner.svg" alt = "logo" style = {{
                    height:"160px",
                    width:"auto"
                }}/>
            </div>
        </>
    )
}

export default PreLoad