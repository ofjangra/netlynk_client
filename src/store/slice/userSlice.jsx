import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const authenticateUser = createAsyncThunk(
    'authenticate',
    async (body) =>{
        const response = await fetch("/api/signin",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(body)
        })
        let responseJson = await response.json()
    
        return responseJson
    }
)

const getProfile = createAsyncThunk(
    'getProfile',
    async () =>{
        
        const response = await fetch("/api/profile",
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
        })
        let responseJson = await response.json()
        return responseJson
    }
)

const updateProfile = createAsyncThunk(
    'updateProfile', 
    async(body) =>{
        const response = await fetch("/api/editprofile",
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(body)
        })
        let responseJson = await response.json()
        return responseJson
    }
)

const logout = createAsyncThunk(
    'logout',
    async() =>{
        const response = await fetch("/api/profile/logout",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
        })
        return {
            initialLoad:true,
            loading:false,
            snack:{
                open: false,
                severity: "",
                message: ""
            },
            auth:{
                authenticated:false,
                error:""
            },
            profile:{
                id:"",
                username:"",
                photo_url:"",
                email:"",
                bio:"",
                links:[]
            },
            modalActive:false
        }
    }

)


const createLink = createAsyncThunk(
    'createLink',
    async(body) =>{
            const resp = await fetch("/api/createlink", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title:body.title,
                url:body.url
              }),
              credentials: "include",
            });
      
            const respJson = await resp.json();

            return {respJson,body}
    }
)

const editLink = createAsyncThunk(
    'editLink', 
    async(body) =>{

        const resp = await fetch(`/api/editlink/${body.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:body.values.title,
                url:body.values.url
            }),
            credentials: "include",
          });

    
          const respJson = await resp.json();
          return {respJson, body}
    }
)



const deleteLink = createAsyncThunk(
    'deleteLink', 
    async(id) =>{


        const resp = await fetch(`/api/deletelink/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

    
          const respJson = await resp.json();
          return {respJson, id}
    }
)




 const userSlice = createSlice({
    name:"user",
    initialState:{
        initialLoad: true,
        loading:false,
        snack:{
            open: false,
            severity: "",
            message: ""
        },
        auth:{
            authenticated:false,
            error:"",
            loading:false
        },
        profile:{
            id:"",
            username:"",
            name:"",
            photo_url:"",
            email:"",
            bio:"",
            links:[]
        },
        modalActive:false,
        editModalActive:false,
    },
    reducers:{
        openModal(state, action){
             state.modalActive = action.payload
        },
        handleEditModal(state, action){
            state.editModalActive = action.payload
        },
        activateLoading(state, action){
            state.loading = action.payload
        },
        handleSnack(state, action){
            state.snack = action.payload
        },
    },

    extraReducers:{
        [authenticateUser.fulfilled] : (state, action) =>{
            if (action.payload.success) {
                state.auth.authenticated = action.payload.success
                state.profile = action.payload.profile
                state.auth.error = ""
            } else if(!action.payload.success) {
                state.auth.authenticated = false,
                state.auth.error = action.payload.message
            }
        },
        [authenticateUser.rejected] : (state) =>{
            state.auth.authenticated = false,
                state.auth.error = "Could not signin"
        },
        [getProfile.fulfilled] : (state, action) =>{
            if (action.payload.success) {
                state.auth.authenticated = action.payload.success
                state.profile = action.payload.profile
                state.initialLoad = false
            }
            if (!action.payload.success) {
                state.auth.authenticated = action.payload.success
                state.initialLoad = false
            }
        },
        [updateProfile.fulfilled] : (state, action) =>{
            if (action.payload.success) {
                state.snack = {
                    open: true,
                    severity: "success",
                    message: action.payload.message
                }
            }
            state.loading = false
            state.profile.name = action.payload.profile.name
            state.profile.username = action.payload.profile.username
            state.profile.photo_url = action.payload.profile.photo_url
            state.profile.email = action.payload.profile.email
            state.profile.bio = action.payload.profile.bio
            getProfile()
            if (!action.payload.success) {
                state.snack = {
                    open: true,
                    severity: "error",
                    message: action.payload.message
                }
            }
        },
        [logout.fulfilled] : (state, action) =>{
                state.auth = action.payload.auth
                state.profile = action.payload.profile
                state.modalActive = action.payload.modalActive
        },
        [createLink.fulfilled] :(state, action) =>{
            if (action.payload.respJson.success) {
                state.snack = {
                    open: true,
                    severity: "success",
                    message: action.payload.respJson.message
                }
                state.profile.links.splice(0,0, {
                    _id:action.payload.respJson._id,
                    title:action.payload.body.title,
                    url:action.payload.body.url
                })
                state.loading = false
                state.modalActive = false
            }
            if (!action.payload.respJson.success) {
                state.snack = {
                    open: true,
                    severity: "error",
                    message: action.payload.respJson.message
                }

                state.loading = false
                state.modalActive = false
            }
        },
        [editLink.fulfilled] : (state, action) =>{
            if (action.payload.respJson.success) {
                state.snack = {
                    open: true,
                    severity: "success",
                    message: action.payload.respJson.message
                }
                
               let linkIndex = state.profile.links.findIndex((val) => val._id === action.payload.body.id)
                state.profile.links[linkIndex].title = action.payload.body.values.title
                state.profile.links[linkIndex].url = action.payload.body.values.url
               state.editModalActive = false
            }
            if (!action.payload.respJson.success) {
                state.snack = {
                    open: true,
                    severity: "error",
                    message: action.payload.respJson.message
                }
                state.editModalActive = false
            }
        },
        [deleteLink.fulfilled] : (state, action) =>{
            if (action.payload.respJson.success) {
                state.snack = {
                    open: true,
                    severity: "success",
                    message: action.payload.respJson.message
                }
                

                    const filteredLinks = state.profile.links.filter((link) =>{
                    return link._id !== action.payload.id
                })

                state.profile.links = filteredLinks
                state.editModalActive = false
            }
            if (!action.payload.respJson.success) {
                state.snack = {
                    open: true,
                    severity: "error",
                    message: action.payload.respJson.message
                }
                state.editModalActive = false
            }

        }
    }
})

export default userSlice.reducer

export const {openModal, activateLoading, handleSnack, handleEditModal} = userSlice.actions
export {authenticateUser, getProfile, updateProfile, logout, createLink, editLink, deleteLink}