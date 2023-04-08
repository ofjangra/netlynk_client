import React from "react";
import { editLink, deleteLink } from "../store/slice/userSlice";
import * as ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
const modalRoot = document.querySelector(".modalRoot");
import { useFormik } from "formik";
import * as Yup from "yup";
import { Close } from "@mui/icons-material";

const EditLink = ({ open, onClose, linkVals }) => {

  
  if (!open) {
    return null;
  }
 
  const dispatch = useDispatch()

  

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
  });


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
            <button type="submit" onClick={() => dispatch(editLink({
              values:formik.values,
              id:linkVals.id
            }))}>Update Link</button>
            <button type = "submit" id = "deleteLink" onClick={() => dispatch(deleteLink(linkVals.id))}>Delete Link</button>
            
            </div>
          </div>
      </div>
    </>,
    modalRoot
  );
};

export default EditLink;
