import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { UploadCloud, X } from "lucide-react";
import MessageComponent from "./MessageComponent";
import { WEBSOCKETSERVER } from "../server";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const { roomName } = useParams();
  const { access, full_name, id } = useSelector((state) => state.auth);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  const connectChat = () => {
    const ws = new WebSocket(
      `${WEBSOCKETSERVER}/chat/${roomName}/?token=${access}`
    );
    socketRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received message:", data);

      if (data.type === "history") {
        setMessages(
          data.messages.map((message) => ({
            ...message,
            seen: true,
          }))
        );
      } else if (data.type === "chat_message") {
        setMessages((prevMessages) => {
          const newMessage = {
            id: data.id,
            content: data.content,
            username: data.username,
            user: data.user,
            timestamp: data.timestamp,
            seen: data.seen || false,
          };
          if (!prevMessages.some((msg) => msg.id === newMessage.id)) {
            return [...prevMessages, newMessage];
          }
          return prevMessages
        });

      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected. Attempting to reconnect...");
      setTimeout(() => {
        if (roomName) {
          connectChat();
        }
      }, 3000);
    };

    return ws;
  };

  useEffect(() => {
    if (roomName) {
      const ws = connectChat();
      return () => ws.close();
    }
  }, [roomName, access]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachment({
        file: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sendMessage = () => {
    if (socketRef.current && (newMessage.trim() || attachment)) {
      try {
        const messageData = {
          type: "message",
          message: newMessage,
          username: full_name,
          user: id,
          chatID: roomName,
        };

        if (attachment) {
          const reader = new FileReader();
          reader.onload = () => {
            messageData.attachment = {
              fileName: attachment.file.name,
              fileType: attachment.file.type,
              fileContent: reader.result.split(",")[1],
            };
            socketRef.current.send(JSON.stringify(messageData));
          };
          reader.readAsDataURL(attachment.file);
        } else {
          socketRef.current.send(JSON.stringify(messageData));
        }

        setNewMessage("");
        setAttachment(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const renderAttachmentPreview = () => {
    if (!attachment) return null;

    if (attachment.file.type.startsWith("image")) {
      return (
        <div className="relative">
          <img
            src={attachment.preview}
            alt="Attachment preview"
            className="w-32 h-32 object-cover rounded-lg"
          />
          <IconButton
            className="absolute top-0 right-0 bg-red-500 text-white p-1"
            onClick={removeAttachment}
            size="small"
          >
            <X size={16} />
          </IconButton>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <Typography variant="body2">{attachment.file.name}</Typography>
        <IconButton
          className="bg-red-500 text-white p-1"
          onClick={removeAttachment}
          size="small"
        >
          <X size={16} />
        </IconButton>
      </div>
    );
  };

  return (
    <Box className="flex flex-col bg-gray-100 p-4">
      <Paper
        elevation={3}
        className="flex-grow p-4 bg-white rounded-lg shadow-md"
      >
        <Typography
          variant="h5"
          className="text-gray-800 mb-4 flex justify-center"
        >
          Messages
        </Typography>
        <Box
          ref={messagesContainerRef}
          className="flex flex-col space-y-2 overflow-y-auto max-h-[400px]"
        >
          {messages.map((message, index) => (
            <MessageComponent
              message={message}
              key={`{message.id}~${index}`}
              id={id}
              attachment={message.attachment}
            />
          ))}
          <div ref={messagesEndRef} />
        </Box>
      </Paper>
      <Box className="mt-4 p-4 bg-gray-200 rounded-lg shadow-inner flex flex-col space-y-4">
        {attachment && (
          <div className="flex items-center space-x-4">
            {renderAttachmentPreview()}
          </div>
        )}
        <Box className="flex items-center space-x-4">
          <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
            InputProps={{
              className: "bg-white rounded-lg",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <IconButton
            color="primary"
            component="label"
            className="!bg-gray-300 !rounded-lg hover:!bg-gray-400"
          >
            <UploadCloud />
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleAttachmentChange}
              accept="image/*,application/pdf"
            />
          </IconButton>
          <Button
            variant="contained"
            onClick={sendMessage}
            aria-label="Send message"
            className="!bg-emerald-500 !text-white !px-4 !py-2 !rounded-lg hover:!bg-emerald-600"
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatRoom;
