import React, { useState } from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteAuthor } from "../features/authorSlice";
import AuthorForm from "../components/AuthorForm";
import CustomButton from "../customComponents/Button/customButton";
import CustomTable from "../customComponents/customTable/customTable";
import {Tooltip} from "antd";
import { DeleteOutlined } from '@ant-design/icons';
const AuthorDashboard = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showAddAuthorModal = () => {
    setIsModalVisible(true);
  };

  const handleDeleteAuthor = (authorId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this author?",
      onOk: () => {
        dispatch(deleteAuthor(authorId));
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Tooltip title="Delete">
        <DeleteOutlined 
          style={{ fontSize: '15px', cursor: 'pointer',color: 'red',marginLeft: '10px' }} 
             onClick={() => handleDeleteAuthor(record.id)}
        />
      </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <h2>Author Dashboard</h2>
      <CustomButton btnText="Add Author" handleSubmit={showAddAuthorModal} />

      <CustomTable columns={columns} dataSource={authors} rowKey="id" />
      <Modal
        title="Add Author"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AuthorForm onClose={() => setIsModalVisible(false)} />
      </Modal>
    </div>
  );
};

export default AuthorDashboard;
