import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  FaBell,
  FaExclamationCircle,
  FaRegCheckCircle,
  FaRegCalendarCheck,
  FaFileAlt,
} from "react-icons/fa";
import { closeNotification, setNotificationCount } from "../redux/slices/notificationSlice";
import NotificationModal from "./utils/NotificationModal";

const NotificationIcons = {
  BOOKING: <FaRegCalendarCheck className="text-white text-2xl" />,
  UPDATE: <FaRegCheckCircle className="text-white text-2xl" />,
  CANCELLATION: <FaExclamationCircle className="text-white text-2xl" />,
  ALERT: <FaExclamationCircle className="text-white text-2xl" />,
  REPORT: <FaFileAlt className="text-white text-2xl" />,
};

const NotificationColors = {
  BOOKING: "bg-blue-500",
  UPDATE: "bg-green-500",
  ALERT: "bg-red-500",
  CANCELLATION: "bg-yellow-500",
  REPORT: "bg-purple-500",
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null); // State for modal
  const { access } = useSelector((state) => state.auth);
  const socketUrl = `ws://localhost:8000/ws/notifications/?token=${access}`;
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket(socketUrl);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications(data.notifications);

      dispatch(
        setNotificationCount(data.notifications ? data.notifications.length : 0)
      );

      if (data.message) {
        setNotifications((prevNotifications) => [
          data.message,
          ...(prevNotifications || []),
        ]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket closed unexpectedly");
    };

    return () => {
      socket.close();
    };
  }, [socketUrl]);

  // Handler to open the modal with the selected notification details
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="text-center mb-4 flex items-center justify-center -mt-8">
        <Typography variant="h6" className="text-indigo-600 font-semibold">
          Notifications
        </Typography>
        <div className="flex justify-center">
          <FaBell className="text-2xl text-indigo-600" />
        </div>
      </div>

      {/* Notifications List */}
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <CardContent>
          <List>
            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText primary="No new notifications" />
              </ListItem>
            ) : (
              notifications.map((notification, index) => (
                <div key={index}>
                  <ListItem
                    className="mb-2 border-b border-gray-300 cursor-pointer"
                    onClick={() => handleNotificationClick(notification)} // Pass the full notification object
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          NotificationColors[notification.type]
                        }`}
                      >
                        {NotificationIcons[notification.type]}
                      </div>

                      <div className="flex-grow">
                        <Typography
                          variant="body1"
                          className="text-gray-800 font-medium"
                        >
                          {notification.type}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="text-gray-500 mt-1"
                        >
                          {new Date(notification.timestamp).toLocaleString()}
                        </Typography>
                      </div>
                    </div>
                  </ListItem>
                </div>
              ))
            )}
          </List>
        </CardContent>
      </Card>

      {/* Render Notification Modal */}
      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Notifications;
