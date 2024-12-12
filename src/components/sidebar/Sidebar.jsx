import React from 'react';
import { useSelector } from 'react-redux';
import StudentSidebar from './variants/StudentSidebar';
import TutorSidebar from './variants/TutorSidebar';
import AdminSidebar from './variants/AdminSidebar';

const Sidebar = () => {
  const role = useSelector((state) => state.auth.role);

  if (role === "STUDENT") {
    return <StudentSidebar />;
  } else if (role === "TUTOR") {
    return <TutorSidebar />;
  } else if (role === "ADMIN") {
    return <AdminSidebar />;
  }
  
  return null;
};

export default Sidebar;