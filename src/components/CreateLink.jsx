import React, { useState } from "react";

import * as ReactDOM from "react-dom";

const modalRoot = document.querySelector(".modalRoot");

import { useFormik } from "formik";

import * as Yup from "yup";

import { Close } from "@mui/icons-material";
import Preload from "./Preload";

const CreateLink = ({ open, onClose }) => {
  const API_endpoint = "http://localhost:5000";

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  const createlink = async (body) => {
    try {
      const resp = await fetch(API_endpoint + "/createlink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("access_token")
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
      createlink(values);
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
        {loading ? (
          <Preload h={"40px"} w={"40px"} r={"20px"} />
        ) : error ? (
          <p style={{ color: "firebrick" }}>{error}</p>
        ) : (
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
        )}
      </div>
    </>,
    modalRoot
  );
};

export default CreateLink;
