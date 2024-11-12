import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { refreshAccessToken } from "../redux/slices/authSlice";
import { FaBell, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import { setNotificationCount, toggleNotification } from "../redux/slices/notificationSlice";
import { toggleMenu } from "../redux/slices/profileSlice";
import { fetchWalletDetails } from "../redux/thunk/walletThunk";
import { Badge } from "@mui/material";

const NavBarItems = () => {
  const { access, full_name } = useSelector((state) => state.auth);
  const { unreadContactsCount } = useSelector((state) => state.chat);
  const { count } = useSelector((state) => state.notifications);
  const [messageCount, setMessageCount] = useState(0);
  const NotificationSocketUrl = `ws://localhost:8000/ws/notifications/?token=${access}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moveToChat = () => {
    navigate("/chat");
  };
  const { roomName } = useParams();

  useEffect(() => {
    dispatch(fetchWalletDetails());
  }, [useLocation()]);

  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/chat-notifications/?token=${access}`
    );

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      setMessageCount(data.message_notification);
    };

    socket.onclose = function () {
      console.error("WebSocket closed unexpectedly");
    };

    return () => socket.close();
  }, [roomName, access]);

  useEffect(() => {
    const socket = new WebSocket(NotificationSocketUrl)
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data)

      dispatch(
        setNotificationCount(data.notifications ? data.notifications.length : 0)
      );
    }
    socket.onclose = function () {
      console.error("WebSocket closed unexpectedly");
    };

    return () => socket.close();
  }, [roomName, NotificationSocketUrl, access])

  return (
    <>
      <Link to={"/"}>
        <Logo />
      </Link>{" "}
      <div className="relative flex items-center text-white">
        <Badge
          color="secondary"
          badgeContent={messageCount}
          invisible={messageCount == 0}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <FaMessage
            size={30}
            className="text-yellow-100 cursor-pointer"
            onClick={moveToChat}
          />
        </Badge>
        <Badge
          color="error"
          badgeContent={count}
          invisible={count == 0}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <FaBell
            size={30}
            className="text-yellow-500 ml-4"
            onClick={() => dispatch(toggleNotification())}
          />
        </Badge>
        <FaUser
          size={30}
          className="text-gray-500 mr-2 ml-4 cursor-pointer"
          onClick={() => dispatch(toggleMenu())}
        />{" "}
        <span
          className="hidden md:block mr-4 cursor-pointer"
          onClick={() => dispatch(toggleMenu())}
        >
          {full_name}
        </span>
      </div>
    </>
  );
};

const StudentNavBar = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-emerald-900 to-green-700 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-8 h-full">
      <NavBarItems />
    </div>
  );
};

const TutorNavBar = () => {
  return (
    <div className="bg-gradient-to-br from-black via-indigo-900 to-blue-700 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-8 h-full">
      <NavBarItems />
    </div>
  );
};

const AdminNavBar = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-blue-900 to-rose-800  z-[20] mx-auto flex w-full items-center justify-between p-8 h-full">
      <NavBarItems />
    </div>
  );
};

const NavBar = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.access);

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
