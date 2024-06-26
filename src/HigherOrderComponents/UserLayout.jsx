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
import Notifications from "../components/Notifications";
import Menu from "../components/Menu";

const UserLayout = () => {
  const role = useSelector((state) => state.auth.role);
  const [showSideBar, setShowSideBar] = useState(false);
  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const showNotification = useSelector((state) => state.notifications.enabled);
  const showProfileMenu =  useSelector((state) => state.profile.enabled)
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
      <div className="relative lg:flex flex-row w-full  h-4/6 ">
        <div className="relative hidden lg:block w-1/5 h-full ">
          <SideBar />
        </div>
        <div onClick={handleSideBar} className="lg:hidden flex justify-between">
          {showSideBar && (
            <div className="w-[60%] h-full absolute z-[10]">
              <SideBar />
            </div>
          )}
          <div className="z-[20] ">
            {showSideBar ? (
              <AiOutlineClose size={20} color="white" />
            ) : (
              <AiOutlineMenu size={20} color="white" />
            )}
          </div>
        </div>
        {!showSideBar && (
          <div className="flex justify-center lg:hidden">
            <div className="absolute">
            <Outlet/>

            </div>
            {showNotification && (
          <div className="origin-top-right absolute right-28 z-20 -mt-16  w-56 rounded-md ring-1 ring-black ring-opacity-5 bg-lime-200">
            <Notifications />
          </div>
        )}
        {showProfileMenu && (
           <div className="origin-top-right absolute right-0 z-20 -mt-16 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <Menu />
          </div>
        )}
            
          </div>
        )}

        <div className="hidden lg:flex relative w-3/5 justify-center">
          <Outlet />
        </div>
        {showNotification && (
          <div className="origin-top-right absolute right-28  z-20 -mt-16 w-56 rounded-md ring-1 ring-black ring-opacity-5 bg-lime-200">
            <Notifications />
          </div>
        )}
        {showProfileMenu && (
           <div className="origin-top-right absolute right-0 z-20 -mt-16 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <Menu />
          </div>
        )}
      </div>
      <div className="relative w-full h-1/6">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
