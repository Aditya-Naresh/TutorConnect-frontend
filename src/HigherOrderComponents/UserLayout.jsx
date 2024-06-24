<script src="http://localhost:8097"></script>;
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import adminImg from "../assets/Gradient1.jpg";
import tutorImg from "../assets/Gradient2.jpg";
import { useSelector } from "react-redux";

const UserLayout = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="relative w-full h-screen bg-slate-700">
      {role === "ADMIN" && (
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={adminImg}
          alt="background"
        />
      )}
      {role === "TUTOR" && (
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={tutorImg}
          alt="background"
        />
      )}
      <div className="relative w-full h-1/6">
        <NavBar />
      </div>
      <div className=" relative flex flex-row w-full h-4/6 ">
        <div className="relative hidden md:block w-1/5 h-full ">
          <SideBar />
        </div>
        <div className="relative w-4/5 flex justify-center">
          <Outlet />
        </div>
      </div>
      <div className="relative w-full h-1/6">
        <Footer/>
      </div>
    </div>
  );
};

export default UserLayout;
