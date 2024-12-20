import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Notifications from "../components/Notifications";
import Menu from "../components/Menu";
import { axiosGet } from "../axios";
import { closeMenu } from "../redux/slices/profileSlice";
import { closeNotification } from "../redux/slices/notificationSlice";
import NavBar from "../components/navigation/NavBar";
import Sidebar from "../components/sidebar/Sidebar";

const UserLayout = () => {
  const { access } = useSelector((state) => state.auth);
  const [showSideBar, setShowSideBar] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    dispatch(closeMenu());
    dispatch(closeNotification())
  }, [location]);

  const showNotification = useSelector((state) => state.notifications.enabled);
  const showProfileMenu = useSelector((state) => state.profile.enabled);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / NavBar */}
      <div className="relative w-full h-[100px]">
        <NavBar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 lg:flex-row flex-col w-full h-auto bg-slate-50">
        {/* Sidebar */}
        <div className="relative hidden lg:block w-1/5 h-full">
          <Sidebar />
        </div>

        {/* Main Outlet / Content */}
        <div className="relative flex-1 flex flex-col lg:flex-row lg:justify-center lg:h-full">
          {/* SideBar Toggle for Mobile */}
          <div
            onClick={handleSideBar}
            className="lg:hidden flex justify-between"
          >
            {showSideBar && (
              <div className="w-[60%] h-full absolute z-[10]">
                <Sidebar />
              </div>
            )}
            <div className="z-[20] ">
              {showSideBar ? (
                <AiOutlineClose size={20} color="white" />
              ) : (
                <AiOutlineMenu size={20} color="black" />
              )}
            </div>
          </div>

          {/* Main Outlet for Content */}
          <div className="relative w-full lg:w-4/5 flex justify-center h-full overflow-hidden">
            <Outlet />
          </div>

          {/* Notifications & Profile Menu */}
          {showNotification && (
            <div className="origin-top-right absolute right-28 z-20 -mt-8 w-96 rounded-md ring-1 ring-black ring-opacity-5 bg-lime-200">
              <Notifications />
            </div>
          )}
          {showProfileMenu && (
            <div className="origin-top-right absolute right-0 z-20 -mt-8 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <Menu />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
