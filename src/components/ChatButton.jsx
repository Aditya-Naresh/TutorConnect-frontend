import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const ChatButton = ({ user_id, role }) => {
  const navigate = useNavigate();

  const buttonClick = async () => {
    navigate(`/chat/${user_id}`);
  };

  return (
    <Button
      variant="contained"
      className="!bg-emerald-500 !text-white !rounded-lg !shadow hover:!bg-emerald-600 transition duration-200 w-48"
      onClick={buttonClick}
      startIcon={<ChatBubbleOutlineIcon />}
    >
      {role === "ADMIN"
        ? "Chat"
        : role === "TUTOR"
        ? "Chat with Student"
        : "Chat with Tutor"}
    </Button>
  );
};

export default ChatButton;
