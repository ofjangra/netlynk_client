import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { authenticateUser } from "../store/slice/userSlice";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

const Signup = () => {

  const dispatch = useDispatch()

  const [error, setError] = useState("")

  const signupUser = async () => {
    const { username, email, password } = formik.values;

    try {
      const signUpResp = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const signUpRespJson = await signUpResp.json();

      if (signUpRespJson.success) {
        dispatch(authenticateUser({
          username,
          password,
        }))
      } else if (!signUpRespJson.success) {
        setError(signUpRespJson.message);
      }
    } catch (err) {}
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-z0-9_-]{3,16}$/igm, "Username can only contain alphabets, numericals, -, and _")
        .required("Username is Required")
        .max(16, "maximum 16 characters are allowed")
        .min(3, "minimum 3 charactes are required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .max(34, "maximum 34 characters are allowed")
        .min(8, "minimum 8 characters are required"),
    }),
    onSubmit: () => {
      signupUser();
    },
  });
  return (
    <>
      <div className="signupMain">
        <div className="loginSignup" id="loginSignup">
          <div className="heroImg">
            <img src="/img/netlynk_logo.svg" alt="logo" />
            <h1>
              One link
              <br />
              for multiple
              <br />
              social links
            </h1>
          </div>
          <div className="formActions">
            <form onSubmit={formik.handleSubmit}>
              <p>{error}</p>
              <div className="inputField">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.username && formik.touched.username ? (
                  <p>{formik.errors.username}</p>
                ) : null}
              </div>
              <div className="inputField">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p>{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="inputField">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <p>{formik.errors.password}</p>
                ) : null}
              </div>

              <button type="submit">Signup</button>
            </form>
            <div className="notAccount">
              <p>Already have an account?</p>
              <Link to="/account/login" className="link">
                <strong style={{ color: "#00aa88" }}>Login</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
