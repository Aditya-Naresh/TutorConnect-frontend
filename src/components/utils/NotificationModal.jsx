import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setRender } from "../../redux/slices/timeSlotSlice";
import { useNavigate } from "react-router-dom";
import {
  FaExclamationCircle,
  FaRegCheckCircle,
  FaRegCalendarCheck,
  FaFileAlt,
} from "react-icons/fa";
import { axiosPatch } from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { closeNotification } from "../../redux/slices/notificationSlice";

// Define icons and colors as in Notifications component
const NotificationIcons = {
  BOOKING: <FaRegCalendarCheck className="text-white text-3xl" />,
  UPDATE: <FaRegCheckCircle className="text-white text-3xl" />,
  CANCELLATION: <FaExclamationCircle className="text-white text-3xl" />,
  ALERT: <FaExclamationCircle className="text-white text-3xl" />,
  REPORT: <FaFileAlt className="text-white text-3xl" />,
};

const NotificationColors = {
  BOOKING: "bg-blue-500",
  UPDATE: "bg-green-500",
  ALERT: "bg-red-500",
  CANCELLATION: "bg-yellow-500",
  REPORT: "bg-purple-500",
};

// Types that may be linked to a time slot
const TimeSlotNotifications = new Set(["BOOKING", "UPDATE", "CANCELLATION"]);

const NotificationModal = ({ notification, onClose }) => {
  const navigate = useNavigate();
  const { access } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (!notification) return null;

  const icon = NotificationIcons[notification.type] || (
    <FaExclamationCircle className="text-white text-3xl" />
  );
  const bgColor = NotificationColors[notification.type] || "bg-gray-500";

  const handleGoToTimeSlot = async () => {
    const data = {
      is_read: true,
    };
    const response = await axiosPatch(
      `notifications/update/${notification.id}`,
      data,
      access
    );
    if (response.status === 200) {
      navigate(notification.link);
      dispatch(setRender(`updated notification: ${notification.id}`));
      onClose();
      dispatch(closeNotification());
    }
  };

  const handleClose = async () => {
    const data = {
      is_read: true,
    };
    const response = await axiosPatch(
      `notifications/update/${notification.id}`,
      data,
      access
    );
    if (response.status === 200) {
      dispatch(setRender(`updated notification: ${notification.id}`));
      onClose();
      dispatch(closeNotification());
    }
  };
  return (
    <Modal open={!!notification} onClose={onClose}>
      <Box
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20 relative"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {/* Close Button */}
        <div className="flex justify-end -mt-4 -mr-4">
          <IconButton
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition duration-200"
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Notification Icon with Background Color */}
        <div
          className={`flex justify-center items-center w-16 h-16 mx-auto rounded-full ${bgColor}`}
        >
          {icon}
        </div>

        {/* Notification Content */}
        <div className="text-center mt-4">
          <Typography
            variant="h6"
            className="text-gray-800 font-bold text-xl mb-4"
          >
            Notification Details
          </Typography>
          <Typography variant="body1" className="text-gray-700 mb-4">
            <span className="font-medium">Message:</span> {notification.message}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            <span className="font-medium">Time:</span>{" "}
            {new Date(notification.timestamp).toLocaleString()}
          </Typography>
        </div>

        {/* Go to Time Slot Button (conditional) */}
        <div className="mt-6 text-center">
          {TimeSlotNotifications.has(notification.type) && notification.link ? (
            <Button
              variant="contained"
              color="primary"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md px-4 py-2 transition duration-300"
              onClick={handleGoToTimeSlot}
            >
              Go to Time Slot
            </Button>
          ) : (
            <Button variant="contained" color="error" onClick={handleClose}>
              Close
            </Button>
          )}
        </div>

        {/* Decorative Bottom Border */}
        <div className="mt-6 border-t-2 border-indigo-500 opacity-75"></div>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
