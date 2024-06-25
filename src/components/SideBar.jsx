import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StudentSideBar = () => {
  return <div>StudentSideBar</div>;
};

const TutorSideBar = () => {
  return (
    <div className="relative bg-gradient-to-br from-black via-blue-900  to-indigo-500 border border-slate-500 w-full h-full">
      <div className="text-white p-4 flex flex-col relative">
      <div className="border-b  border-b-blue-800 py-2 flex justify-center ">
          <Link to={"/"} className="cursor-pointer">
            Upcoming Schedule
          </Link>
        </div>
        <div className="border-b  border-b-blue-800 py-2 flex justify-center ">
          <Link to={"/user-management/TUTOR"} className="cursor-pointer">
            Create Time Slots
          </Link>
        </div>
        <div className="border-b  border-b-blue-800 py-2 flex justify-center ">
          <Link to={"/user-management/TUTOR"} className="cursor-pointer">
            Previous Sessions
          </Link>
        </div>
        
      
      </div>
      </div>
  );
};

const AdminSideBar = () => {
  return (
    <div className="relative bg-gradient-to-br from-black via-red-900  to-rose-700 border border-slate-500 w-full h-full">
      <div className="text-white p-4 flex flex-col relative">
        <div className="border-b  border-b-red-400 py-2 flex justify-center ">
          <Link to={"/user-management/TUTOR"} className="cursor-pointer">
            Tutors
          </Link>
        </div>
        <div className="border-b border-b-red-400 py-2 flex justify-center">
          <Link to={"/user-management/STUDENT"} className="cursor-pointer">
            Students
          </Link>
        </div>
        <div className="py-2 flex justify-center">Approve Tutor</div>
      </div>
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
