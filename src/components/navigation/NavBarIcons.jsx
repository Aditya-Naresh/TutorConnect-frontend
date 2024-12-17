import React from 'react';
import { FaBell, FaUser, FaMessage } from 'react-icons/fa6';
import { Badge } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleNotification } from '../../redux/slices/notificationSlice';
import { toggleMenu } from '../../redux/slices/profileSlice';

export const MessageIcon = ({ messageCount, onClick }) => (
  <Badge
    color="error"
    badgeContent={messageCount}
    invisible={messageCount == 0}
    max={9}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    <FaMessage
      size={30}
      className="text-yellow-100 cursor-pointer"
      onClick={onClick}
    />
  </Badge>
);

export const NotificationIcon = ({ count }) => {
  const dispatch = useDispatch();
  
  return (
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
        className="text-yellow-500 ml-4 cursor-pointer"
        onClick={() => dispatch(toggleNotification())}
      />
    </Badge>
  );
};

export const UserIcon = ({ fullName }) => {
  const dispatch = useDispatch();
  
  return (
    <>
      <FaUser
        size={30}
        className="text-gray-600 mr-2 ml-4 cursor-pointer"
        onClick={() => dispatch(toggleMenu())}
      />
      <span
        className="hidden md:block mr-4 cursor-pointer"
        onClick={() => dispatch(toggleMenu())}
      >
        {fullName}
      </span>
    </>
  );
};