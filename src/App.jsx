import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CourseDashboard from './pages/CourseDashboard';
import AuthorDashboard from './pages/AuthorDashboard';
import AppLayout from './components/Layout';
import './styles/Layout.scss';
const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route
      path="/manage-courses"
      element={
        <AppLayout>
          <CourseDashboard />
        </AppLayout>
      }
    />
    <Route
      path="/manage-authors"
      element={
        <AppLayout>
          <AuthorDashboard />
        </AppLayout>
      }
    />
  </Routes>
);

export default App;
 