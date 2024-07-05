import React from "react";
import { useSelector } from "react-redux";

const Notifications = ({ notifications, setReqId }) => {
  const auth = useSelector((state) => state.auth);
  const { role } = auth;

  const validNotifications = Array.isArray(notifications) ? notifications : [];

  return (
    <div className="notifications z-20 bg-lime-200 p-4 rounded-md shadow-md ">
      {validNotifications &&(
        <ul>
          {validNotifications.map((notification, index) => (
            <li
              key={index}
              className={`text-sm cursor-pointer`}
              onClick={() => setReqId( notification.id)}
            >
              {role === "TUTOR" && (
                <span>{notification.student_name} has created a request</span>
              )}
              {role === "STUDENT" && (
                <span>{notification.tutor_name} has {notification.is_accepted ? " accepted your request" : " rejected your request"}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
