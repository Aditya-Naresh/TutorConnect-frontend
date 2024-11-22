import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent, Divider } from "@mui/material"; // Material UI components

// Common Sidebar Container
const SidebarContainer = ({ children, bgColor }) => {
  return (
    <Card className={`relative ${bgColor} border border-slate-500 w-full h-full shadow-lg`}>
      <CardContent className="text-white p-4 flex flex-col relative space-y-2">
        {children}
      </CardContent>
    </Card>
  );
};

// Student Sidebar
const StudentSideBar = () => {
  return (
    <SidebarContainer bgColor="bg-gradient-to-bl from-black via-emerald-900 to-green-500">
      <SidebarLink to="/" text="Booked Sessions" borderColor="border-emerald-800" />
      <SidebarLink to="/tutorlist" text="List Tutors" borderColor="border-emerald-800" />
      <SidebarLink to="/user-management/TUTOR" text="Previous Sessions" borderColor="border-emerald-800" />
    </SidebarContainer>
  );
};

// Tutor Sidebar
const TutorSideBar = () => {
  return (
    <SidebarContainer bgColor="bg-gradient-to-bl from-black via-blue-900 to-emerald-500">
      <SidebarLink to="/" text="Upcoming Schedule" borderColor="border-blue-800" />
      <SidebarLink to="/timeslots" text="Create Time Slots" borderColor="border-blue-800" />
      <SidebarLink to="/user-management/TUTOR" text="Previous Sessions" borderColor="border-blue-800" />
    </SidebarContainer>
  );
};

// Admin Sidebar
const AdminSideBar = () => {
  return (
    <SidebarContainer bgColor="bg-gradient-to-br from-black via-blue-900 to-rose-700">
      <SidebarLink to="/user-management/TUTOR" text="Tutors" borderColor="border-red-400" />
      <SidebarLink to="/user-management/STUDENT" text="Students" borderColor="border-red-400" />
      <SidebarLink to="/cancellations" text="Cancellations" borderColor="border-red-400" />

    </SidebarContainer>
  );
};

// Helper Component for Sidebar Links
const SidebarLink = ({ to, text, borderColor }) => {
  return (
    <div className={`border-b ${borderColor} py-2 flex justify-center`}>
      <Link to={to} className="cursor-pointer text-lg font-medium hover:text-gray-200">
        {text}
      </Link>
    </div>
  );
};

const SideBar = () => {
  const role = useSelector((state) => state.auth.role);

  if (role === "STUDENT") {
    return <StudentSideBar />;
  } else if (role === "TUTOR") {
    return <TutorSideBar />;
  } else if (role === "ADMIN") {
    return <AdminSideBar />;
  } else {
    return null;
  }
};

export default SideBar;
