import React from 'react';
import SidebarContainer from '../SidebarContainer';
import SidebarLink from '../SidebarLink';
import { FaCalendarCheck, FaUserGraduate, FaHistory } from 'react-icons/fa';

const StudentSidebar = () => {
  return (
    <SidebarContainer bgColor="bg-gradient-to-br from-teal-900 via-teal-700 to-teal-500">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white">Student Portal</h2>
      </div>
      <SidebarLink 
        to="/" 
        text="Booked Sessions" 
        borderColor="border-emerald-400"
        icon={FaCalendarCheck}
      />
      <SidebarLink 
        to="/tutorlist" 
        text="Find Tutors" 
        borderColor="border-emerald-400"
        icon={FaUserGraduate}
      />
      <SidebarLink 
        to="/session-history" 
        text="Session History" 
        borderColor="border-emerald-400"
        icon={FaHistory}
      />
    </SidebarContainer>
  );
};

export default StudentSidebar;