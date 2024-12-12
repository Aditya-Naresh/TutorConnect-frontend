import React from 'react';
import SidebarContainer from '../SidebarContainer';
import SidebarLink from '../SidebarLink';
import { FaChalkboardTeacher, FaUserGraduate, FaBan } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <SidebarContainer bgColor="bg-gradient-to-br from-slate-900 via-purple-800 to-purple-600">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
      </div>
      <SidebarLink 
        to="/user-management/TUTOR" 
        text="Manage Tutors" 
        borderColor="border-purple-400"
        icon={FaChalkboardTeacher}
      />
      <SidebarLink 
        to="/user-management/STUDENT" 
        text="Manage Students" 
        borderColor="border-purple-400"
        icon={FaUserGraduate}
      />
      <SidebarLink 
        to="/cancellations" 
        text="Cancellations" 
        borderColor="border-purple-400"
        icon={FaBan}
      />
    </SidebarContainer>
  );
};

export default AdminSidebar;