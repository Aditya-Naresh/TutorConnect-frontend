<script src="http://localhost:8097"></script>;
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import adminImg from "../assets/Gradient1.jpg";
import tutorImg from "../assets/Gradient2.jpg";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const UserLayout = () => {
  const role = useSelector((state) => state.auth.role);
  const [showSideBar, setShowSideBar] = useState(false);
  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
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
      <div className="relative md:flex flex-row w-full  h-4/6 ">
        <div className="relative hidden md:block w-1/5 h-full ">
          <SideBar />
        </div>
        <div onClick={handleSideBar} className="md:hidden flex justify-between">
          {showSideBar && (
            <div className="w-[60%] h-full absolute z-[10]">
              <SideBar />
            </div>
          )}
          <div className="z-[20] ">

          {showSideBar ? (
            <AiOutlineClose size={20} color="white"/>
          ) : (
            <AiOutlineMenu size={20} color="white"/>
          )}
          </div>
        </div>
        {!showSideBar && (
          <div className="flex justify-center mx-auto my-auto">
            <Outlet />
          </div>
        )}

        <div className="hidden md:flex relative w-4/5 justify-center">
          <Outlet />
        </div>
      </div>
      <div className="relative w-full h-1/6">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
