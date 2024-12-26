import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Notifications from "../components/Notifications";
import Menu from "../components/Menu";
import { closeMenu } from "../redux/slices/profileSlice";
import { closeNotification } from "../redux/slices/notificationSlice";
import NavBar from "../components/navigation/NavBar";
import Sidebar from "../components/sidebar/Sidebar";
import { WEBSOCKETSERVER } from "../server";
import {
  acceptCall,
  closeWebSocket,
  declineCall,
  receiveCallRequest,
  setWebSocket,
} from "../redux/slices/callSlice";
import IncomingCallNotification from "../components/videocall/IncomingCallNotification";
import OutGoingCall from "../components/videocall/OutGoingCall";

const UserLayout = () => {
  const { access, id, full_name } = useSelector((state) => state.auth);
  const [showSideBar, setShowSideBar] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const ws = useRef(null);
  const navigate = useNavigate();

  const call = useSelector((state) => state.call);

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    dispatch(closeMenu());
    dispatch(closeNotification());
  }, [location]);

  // WebSocket for call notifications
  useEffect(() => {
    if (!id) return;
    const connectSocket = () => {
      ws.current = new WebSocket(
        `${WEBSOCKETSERVER}/call/notification/${id}/?token=${access}`
      );

      ws.current.onopen = () => {
        console.log("WebSocket connected to call notification");
      };

      ws.current.onclose = (e) => {
        console.log(e);
        console.log("call Notification WebSocket disconnected");
        setTimeout(connectSocket, 5000);
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("data: ", data);

        if (data.type === "CALL_REQUEST" && data.from !== id) {
          if (call.isInCall) {
            console.log("incomingcall: ", call.incomingCall);

            ws.current.send(
              JSON.stringify({
                action: "reject",
                target_id: call.incomingCall,
              })
            );
            dispatch(declineCall());
          } else {
            dispatch(
              receiveCallRequest({
                from: data.from,
                from_name: data.from_user_name,
                callerImage: data.profile_pic,
                timeSlot: data.timeSlot,
                receiver: id,
                receiver_name: full_name,
              })
            );
          }
        }

        if (data.type === "CALL_REJECTED") {
          dispatch(declineCall());
        }

        if (data.type === "CALL_ABANDONED") {
          dispatch(declineCall());
        }

        if (data.type === "CALL_ACCEPTED") {
          dispatch(acceptCall());
          console.log("navigate to : session_room-", data.timeSlot);
          navigate(`/session/${data.timeSlot}`);
        }
      };

      ws.current.onerror = (error) => {
        console.error("CallNotificationWebSocket error: ", error);
      };

      dispatch(setWebSocket(ws.current));
    };
    connectSocket();
    return () => {
      dispatch(closeWebSocket());
    };
  }, [access, id, dispatch]);

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

      {/* Incoming Call Notification */}
      {call.incomingCall && (
        <IncomingCallNotification
          from={call.incomingCall.from}
          callerImage={call.incomingCall.callerImage}
          onClose={() => dispatch(declineCall())}
        />
      )}

      {/* Outgoing call Modal */}
      {call.isCalling && <OutGoingCall />}

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
