import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addAuthor } from "../features/authorSlice";
import { Input } from "antd";
import CustomButton from "../customComponents/Button/customButton";
const AuthorForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[A-Za-z\s]+$/,
        "Author name must contain only letters and spaces"
      )
      .min(6, "Author name must be at least 6 characters")
      .required("Please enter the author name"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addAuthor(values));
      onClose();
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="name">Author Name</label>
        <Input
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div style={{ color: "red", fontSize: "12px" }}>
            {formik.errors.name}
          </div>
        )}
      </div>

      <CustomButton
        btnText="Add Author"
        handleSubmit={formik.handleSubmit}
        disabled={formik.isSubmitting || !formik.isValid}
      />
    </form>
  );
};

export default AuthorForm;
