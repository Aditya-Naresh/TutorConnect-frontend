import React, { useEffect } from "react";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { refreshAccessToken } from "../redux/slices/authSlice";
import { FaBell, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import { toggleNotification } from "../redux/slices/notificationSlice";
import { toggleMenu } from "../redux/slices/profileSlice"


const NavBarItems = () => {
  const username = useSelector((state) => state.auth.full_name)
  const dispatch = useDispatch()
  return(
    <>
    <Link to={"/"}>
    <Logo />
  </Link>{" "}
  <div className="relative flex items-center text-white">
    <FaMessage size={30} className="text-yellow-100 mr-4" />
    <FaBell size={30} className="text-yellow-500 mr-4" onClick={() => dispatch(toggleNotification())} />
    <FaUser size={30} className="text-gray-500 mr-2"  onClick={() => dispatch(toggleMenu())}/>{" "}
    <span className="hidden md:block mr-4" onClick={() => dispatch(toggleMenu())}>{username}</span>
  </div>
    </>
  )
}
const StudentNavBar = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-emerald-700 to-green-500 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-8 h-full">
      <NavBarItems />
    </div>
  );
};

const TutorNavBar = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-indigo-900 to-blue-700 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-8 h-full">
    <NavBarItems />
    </div>
  );
};

const AdminNavBar = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-red-900 to-rose-800  z-[20] mx-auto flex w-full items-center justify-between p-8 h-full">
      <NavBarItems />
    </div>
  );
};

const NavBar = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);
  if (role === "STUDENT") {
    return <StudentNavBar />;
  } else if (role === "TUTOR") {
    return <TutorNavBar />;
  } else {
    return <AdminNavBar />;
  }
};

export default NavBar;
