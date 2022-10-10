import React, { useEffect, useState } from "react";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import * as ReactDOM from "react-dom";

const modalRoot = document.querySelector(".modalRoot");

import { useFormik } from "formik";

import * as Yup from "yup";

import { Close } from "@mui/icons-material";
import Preload from "./Preload";

const EditLink = ({ open, onClose, linkVals }) => {

 

  const API_endpoint = "http://localhost:5000"
  
  if (!open) {
    return null;
  }
 

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  const editlink = async (body) => {
    try {
      const resp = await fetch(API_endpoint + `/editlink/${linkVals.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      setLoading(true);

      const respJson = await resp.json();

      if (respJson.error) {
        setError(respJson.error);
      }
      onClose();
      refreshPage();
    } catch (err) {}
  };

  const deleteLink = async () =>{
    
    try {
      const resp = await fetch(API_endpoint + `/deletelink/${linkVals.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setLoading(true);

      const respJson = await resp.json();

      if (respJson.error) {
        setError(respJson.error);
      }
      onClose();
      refreshPage();
    } catch (err) {
    }
  }

  const formik = useFormik({
    initialValues: {
      title: linkVals.title,
      url: linkVals.url,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(65, "65 characters only"),
      url: Yup.string()
        .url("Please enter a valid url")
        .required("URL is required"),
    }),
    onSubmit: (values) => {
      editlink(values);
    },
  });


  return ReactDOM.createPortal(
    <>

      <div className="modalContainer">
        <Close
          onClick={onClose}
          style={{ cursor: "pointer" }}
          id="modalCloseBtn"
        />
        {loading ? 
          <Preload h={"40px"} w={"40px"} r={"20px"} />
        : error ? 
          <p style={{ color: "firebrick" }}>{error}</p>
         : 
         <div className="formContainer">
          <form onSubmit={formik.handleSubmit}>
            <strong>Edit Link</strong>
            <div className="inputField">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                value={formik.values.title}
                name="title"
                id="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title ? (
                <p>{formik.errors.title}</p>
              ) : null}
            </div>

            <div className="inputField">
              <label htmlFor="url">Target URL</label>
              <input
                type="url"
                value={formik.values.url}
                name="url"
                id="url"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.url && formik.touched.url ? (
                <p>{formik.errors.url}</p>
              ) : null}
            </div>
           
          </form>
          <div className="linkActions">
            <button type="submit" onClick={formik.submitForm}>Update Link</button>
            <button type = "submit" id = "deleteLink" onClick={() =>deleteLink()}>Delete Link</button>
            
            </div>
          </div>
        }
      </div>
    </>,
    modalRoot
  );
};

export default EditLink;
