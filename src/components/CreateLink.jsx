import React, { useState } from "react";
import * as ReactDOM from "react-dom";
const modalRoot = document.querySelector(".modalRoot");
import { useFormik } from "formik";
import * as Yup from "yup";
import { Close } from "@mui/icons-material";
import Preload from "./Preload";
import { useDispatch } from "react-redux";
import { activateLoading } from "../store/slice/userSlice";
import { createLink } from "../store/slice/userSlice";


const CreateLink = ({ open, onClose }) => {

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      title: "",
      url: "",
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
      dispatch(activateLoading())
      dispatch(createLink(values))
    },
  });

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className="modalContainer">
        <Close
          onClick={onClose}
          style={{ cursor: "pointer" }}
          id="modalCloseBtn"
        />
        
          <div className="formContainer">
          <form onSubmit={formik.handleSubmit}>
          <strong>Create New Link</strong>
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
          <button type="submit" onClick={formik.submitForm}>Create Link</button>
          </div>
          </div>
      </div>
    </>,
    modalRoot
  );
};

export default CreateLink;
