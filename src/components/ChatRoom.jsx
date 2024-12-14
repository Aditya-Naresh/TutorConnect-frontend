import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useSelector } from "react-redux";
import MessageComponent from "./MessageComponent";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { roomName } = useParams();
  const { access, full_name, id } = useSelector((state) => state.auth);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const connectChat = () => {
    const ws = new WebSocket(
      `ws://localhost:8000/ws/chat/${roomName}/?token=${access}`
    );
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received message:", data);

      if (data.type === "history") {
        setMessages(data.messages.map(message => ({
          ...message,
          seen: true,
        })));
      } else if (data.type === "message") {
        setMessages((prevMessages) => {
          const newMessage = {
            id: data.message_id,
            content: data.content,
            username: data.username,
            user: data.user,
            timestamp: data.timestamp,
            seen: data.seen || false, 
          };
          if (!prevMessages.some((msg) => msg.id === newMessage.id)) {
            return [...prevMessages, newMessage];
          }
          return prevMessages;
        });
      }
    };

    return () => {
      ws.close();
    };
  };

  useEffect(() => {
    if (roomName) {
      connectChat();
    }
  }, [roomName, access]);

  useEffect(() => {
    if (messagesEndRef.current) {
      // Scroll the message container to the bottom when a new message is added
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      const messageData = {
        type: "message",
        message: newMessage,
        username: full_name,
        user: id,
        chatID: roomName,
      };
      socket.send(JSON.stringify(messageData));
      setNewMessage("");
    }
  };

  return (
    <Box className="flex flex-col bg-gray-100 p-4">
      <Paper
        elevation={3}
        className="flex-grow p-4 bg-white rounded-lg shadow-md"
      >
        <Typography variant="h5" className="text-gray-800 mb-4 flex justify-center">
          Messages
        </Typography>
        <Box
          ref={messagesContainerRef}
          className="flex flex-col space-y-2 overflow-y-auto max-h-[400px]" // Set a fixed height for the messages container
        >
          {messages.map((message, index) => (
            <MessageComponent message={message} key={message.id} id={id} />
          ))}
          <div ref={messagesEndRef} />
        </Box>
      </Paper>
      <Box className="mt-4 p-4 bg-gray-200 rounded-lg shadow-inner flex items-center space-x-4">
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
        <Button
          variant="contained"
          onClick={sendMessage}
          className="!bg-emerald-500 !text-white !px-4 !py-2 !rounded-lg hover:!bg-emerald-600"
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ChatRoom;
