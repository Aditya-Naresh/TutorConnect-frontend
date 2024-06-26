import React from "react";

const Notifications = () => {
  const notifications = [
    "Admin have approved your profile",
    "Aditya has made a request",
  ];
  return (
    <div className="notifications bg-lime-200 p-4 rounded-md shadow-md">
      {notifications.length === 0 ? (
        <p>There are no notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className={`${index === notifications.length - 1 ? '' : 'pb-4'} text-sm`}>{notification}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
