import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, updateCourse } from "../features/courseSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../customComponents/Button/customButton";
const CourseForm = ({ course, isEditMode, onClose }) => {
  const dispatch = useDispatch();
  const { authors } = useSelector((state) => state.authors);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters long")
      .max(10, "Title must not exceed 50 characters")
      .required("Please enter the course title"),
    author: Yup.string().required("Please select an author"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters long")
      .max(500, "Description must not exceed 500 characters")
      .required("Please enter the course description"),
  });

  const formik = useFormik({
    initialValues: {
      title: course?.title || "",
      author: course?.author || "",
      description: course?.description || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isEditMode) {
        dispatch(updateCourse({ ...course, ...values }));
      } else {
        dispatch(addCourse(values));
      }
      onClose();
      formik.resetForm();
    },
  });

  return (
    <Form layout="vertical" onFinish={formik.handleSubmit}>
      <Form.Item
        label="Title"
        validateStatus={
          formik.errors.title && formik.touched.title ? "error" : ""
        }
        help={formik.touched.title && formik.errors.title}
      >
        <Input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>

      <Form.Item
        label="Author"
        validateStatus={
          formik.errors.author && formik.touched.author ? "error" : ""
        }
        help={formik.touched.author && formik.errors.author}
      >
        <Select
          name="author"
          value={formik.values.author}
          onChange={(value) => formik.setFieldValue("author", value)}
          onBlur={() => formik.setFieldTouched("author")}
        >
          {authors.map((author) => (
            <Select.Option key={author.id} value={author.name}>
              {author.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Description"
        validateStatus={
          formik.errors.description && formik.touched.description ? "error" : ""
        }
        help={formik.touched.description && formik.errors.description}
      >
        <Input.TextArea
          name="description"
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>

      <Form.Item>
        <CustomButton btnText={isEditMode ? "Update Course" : "Add Course"} />
      </Form.Item>
    </Form>
  );
};

export default CourseForm;
