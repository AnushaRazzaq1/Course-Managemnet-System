import React, { useState } from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteCourse } from "../features/courseSlice";
import CourseForm from "../components/CourseForm";
import CustomTable from "../customComponents/customTable/customTable";
import CustomButton from "../customComponents/Button/customButton";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {Tooltip} from "antd";
const CourseDashboard = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const showAddCourseModal = () => {
    setIsEditMode(false);
    setCurrentCourse(null);
    setIsModalVisible(true);
  };

  const showEditCourseModal = (course) => {
    setIsEditMode(true);
    setCurrentCourse(course);
    setIsModalVisible(true);
  };

  const handleDeleteCourse = (courseId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this course?",
      onOk: () => {
        dispatch(deleteCourse(courseId));
      },
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
            <div className="flex  items-center gap-4">
      <Tooltip title="Add">
        <DeleteOutlined 
          style={{ fontSize: '15px', cursor: 'pointer',color: 'red',marginRight: '30px' }} 
          onClick={() => handleDeleteCourse(record.id)} 
        />
      </Tooltip>
      <Tooltip title="Edit">
        <EditOutlined 
          style={{ fontSize: '15px', cursor: 'pointer',color: 'blue' }} 
          onClick={() => showEditCourseModal(record)}
        />
      </Tooltip>
    </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <CustomButton btnText="Add Course" handleSubmit={showAddCourseModal} />
      <CustomTable columns={columns} dataSource={courses} rowKey="id" />
      <Modal
        title={isEditMode ? "Edit Course" : "Add Course"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <CourseForm
          course={currentCourse}
          isEditMode={isEditMode}
          onClose={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default CourseDashboard;
