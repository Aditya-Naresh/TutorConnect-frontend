import React from "react";
import { Typography, Box } from "@mui/material";

const MessageComponent = ({ message, id }) => {
  const isOwnMessage = message.user === id;

  return (
    <Box
      className={`p-3 rounded-lg max-w-xs break-words ${
        isOwnMessage
          ? "bg-teal-600 text-white self-end"
          : "bg-gray-100 text-slate-900 self-start"
      }`}
    >
      <Typography
        variant="subtitle2"
        className={`${
          isOwnMessage ? "text-yellow-400" : "text-emerald-500"
        } font-semibold`}
      >
        {message.username} {message.user_id}
      </Typography>
      <Box className="flex items-center mt-1 mb-2">
        <Typography variant="body2" className="opacity-80">
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageComponent;
