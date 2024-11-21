import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, message } from "antd";
import CustomButton from "../customComponents/Button/customButton";
import axios from "axios";
import "../styles/Login.scss";

const LOGIN_API_URL = "https://api.freeapi.app/api/v1/users/login";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(LOGIN_API_URL, {
        username: values.username,
        password: values.password,
      });

      console.log("Full API Response:", response);

      if (response.status === 200 && response.data.data.accessToken) {
        localStorage.setItem("token", response.data.data.accessToken);
        message.success("Login successful!");

        const role = response.data.data.user.role;
        console.log("Role from response:", role);

        if (role) {
          if (role.toUpperCase() === "ADMIN") {
            window.location.href = "/manage-authors";
          } else {
            window.location.href = "/manage-courses";
          }
        } else {
          message.error("Role not found in the response.");
        }
      } else {
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({  }) => (
          <Form className="login-form">
            <h2 className="login-title">Login</h2>
            <div className="form-field">
              <Field name="username" as={Input} placeholder="Username" />
              <ErrorMessage name="username" component="div"/>
            </div>
            <div className="form-field">
              <Field
                name="password"
                as={Input.Password}
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-action">
              <CustomButton
                btnText="Login"
                htmlType="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
