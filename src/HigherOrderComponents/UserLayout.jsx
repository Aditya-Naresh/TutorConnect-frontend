import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Notifications from "../components/Notifications";
import Menu from "../components/Menu";
import { axiosGet } from "../axios";
import { toggleNotification } from "../redux/slices/notificationSlice";
import TuitionRequest from "../components/TuitionRequest";

const UserLayout = () => {
  const auth = useSelector((state) => state.auth);
  const { role, access } = auth;
  const [notifications, setNotifications] = useState([]);
  const [showSideBar, setShowSideBar] = useState(false);
  const [reqId, setReqId] = useState();
  const [showReqForm, setShowReqFrom] = useState(false);
  const dispatch = useDispatch();

  const reqHandle = (value) => {
    setReqId(value);
    setShowReqFrom(true);
    dispatch(toggleNotification());
  };

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const fetchNotifications = async () => {
    try {
      const response = await axiosGet("timeslots/tuition-request/", access);
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [showReqForm]);

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
          <SideBar />
        </div>

        {/* Main Outlet / Content */}
        <div className="relative flex-1 flex flex-col lg:flex-row lg:justify-center lg:h-full">
          {/* SideBar Toggle for Mobile */}
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
            <div className="origin-top-right absolute right-28 z-20 -mt-8 w-56 rounded-md ring-1 ring-black ring-opacity-5 bg-lime-200">
              <Notifications notifications={notifications} setReqId={reqHandle} />
            </div>
          )}
          {showProfileMenu && (
            <div className="origin-top-right absolute right-0 z-20 -mt-8 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <Menu />
            </div>
          )}
          {showReqForm && (
            <div className="absolute">
              <TuitionRequest id={reqId} setShowReqForm={setShowReqFrom} />
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
