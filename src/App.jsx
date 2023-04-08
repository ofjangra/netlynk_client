import React, { useState } from "react";
import Layout from "./Layout";
import Nav from "./components/Nav";
import { useSelector, useDispatch } from 'react-redux'
import { getProfile, openModal, handleSnack } from "./store/slice/userSlice";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PreLoad from "./components/Preload";
import InitLoad from './components/InitLoad'

import { useEffect } from "react";
import CreateLink from "./components/CreateLink";
const App = () =>{
    const auth = useSelector((state) => state.user.auth.authenticated)
    const modalOpen = useSelector((state) => state.user.modalActive)
    const initialLoad = useSelector((state) => state.user.initialLoad)
    const loading = useSelector((state) => state.user.loading)
    const snackMessage = useSelector((state) => state.user.snack)
    const dispatch = useDispatch()
    useEffect(() =>{
        if(auth){
            return 
        }
        dispatch(getProfile())

    },[])

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(handleSnack({
            ...snackMessage,
            open:false
        }))
    };



    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    
    return(
        <>
        {
            auth ? <Nav/> : null
        }
        {   initialLoad  ?
        <InitLoad/> :
        <>
            {
                loading ? <PreLoad/> :
            <>
        <Snackbar open={snackMessage.open} autoHideDuration={5000} onClose={handleSnackClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert severity={snackMessage.severity} sx={{ width: '100%' }} onClose={handleSnackClose}>
                <span>{snackMessage.message}</span>
            </Alert>
        </Snackbar>
        <Layout/>
        <CreateLink open={modalOpen} onClose = {()=>dispatch(openModal(false))}/>
        </>
            }
        </>
        }
        </>
    )
   
}

export default App