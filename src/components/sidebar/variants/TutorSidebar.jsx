import React from 'react';
import SidebarContainer from '../SidebarContainer';
import SidebarLink from '../SidebarLink';
import { FaCalendarAlt, FaClock, FaHistory } from 'react-icons/fa';

const TutorSidebar = () => {
  return (
    <SidebarContainer bgColor="bg-gradient-to-bl from-indigo-900 via-blue-800 to-blue-600">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white">Tutor Portal</h2>
      </div>
      <SidebarLink 
        to="/" 
        text="Upcoming Schedule" 
        borderColor="border-blue-400"
        icon={FaCalendarAlt}
      />
      <SidebarLink 
        to="/timeslots" 
        text="Create Time Slots" 
        borderColor="border-blue-400"
        icon={FaClock}
      />
      <SidebarLink 
        to="/user-management/TUTOR" 
        text="Session History" 
        borderColor="border-blue-400"
        icon={FaHistory}
      />
    </SidebarContainer>
  );
};

export default TutorSidebar;