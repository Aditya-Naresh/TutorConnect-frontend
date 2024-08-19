<script src="http://localhost:8097"></script>;
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import adminImg from "../assets/Gradient1.jpg";
import tutorImg from "../assets/Gradient2.jpg";
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
    <div className="relative w-full h-screen bg-slate-50">
      <div className="relative w-full h-[100px]">
        <NavBar />
      </div>
      <div className="relative lg:flex flex-row w-full  h-5/6 ">
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
              <AiOutlineMenu size={20} color="black" />
            )}
          </div>
        </div>
        {!showSideBar && (
          <div className="relative flex justify-center lg:hidden">
            <div className="absolute h-auto">
              <Outlet />
            </div>
            {showNotification && (
              <div className="origin-top-right absolute right-28 z-20 -mt-8  w-56 rounded-md ring-1 ring-black ring-opacity-5 bg-lime-200">
                <Notifications
                  notifications={notifications}
                  setReqId={reqHandle}
                />
              </div>
            )}
            {showProfileMenu && (
              <div className="origin-top-right absolute lg:hidden right-0 z-20 -mt-8 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <Menu />
              </div>
            )}

            {showReqForm && (
              <div className="absolute">
                <TuitionRequest id={reqId} setShowReqForm={setShowReqFrom} />
              </div>
            )}
          </div>
        )}

        <div className="hidden lg:flex relative w-3/5 z-22 justify-center h-full overflow-hidden">
          <Outlet />
        </div>
        {showNotification && (
          <div className="origin-top-right hidden  lg:flex absolute right-28  z-20 -mt-8 w-56 rounded-md ring-1 ring-black ring-opacity-5 bg-lime-200">
            <Notifications notifications={notifications} setReqId={reqHandle} />
          </div>
        )}
        {showProfileMenu && (
          <div className="origin-top-right hidden lg:flex absolute right-0 z-20 -mt-8 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <Menu />
          </div>
        )}
        {showReqForm && (
          <div className="hidden lg:block">
            <TuitionRequest id={reqId} setShowReqForm={setShowReqFrom} />
          </div>
        )}
      </div>
      <div className="relative w-full h-[100px] z-0">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
