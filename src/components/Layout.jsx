import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import CustomButton from "../customComponents/Button/customButton";
const { Header, Sider, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const email = user?.email;

  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    if (location.pathname.includes("manage-courses")) {
      setSelectedKey("1");
    } else if (location.pathname.includes("manage-authors")) {
      setSelectedKey("2");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={240} className="sidebar">
        <div className="sidebar-logo">
          <img src="images/image.png" alt="Logo" />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/manage-courses">Course Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/manage-authors">Author Dashboard</Link>
            </Menu.Item>
          </Menu>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "20px",
          }}
        >
          <div className="email-display">{email}</div>

          <h1>
            <b>Course Management System</b>
          </h1>

          <CustomButton btnText="Logout" handleSubmit={handleLogout} />
        </Header>

        <Content style={{ padding: "24px", margin: 0, minHeight: 280 }}>
          {children}
        </Content>

        <Footer className="footer">
          <div className="footer-content">
            <p>© 2024 Course Management System</p>
            <p>All rights reserved | Developed by YourName</p>
            <p>
              <a href="mailto:support@coursemanagement.com">
                support@coursemanagement.com
              </a>
            </p>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
