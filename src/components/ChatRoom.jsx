import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useSelector } from 'react-redux';

function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const { roomName } = useParams();
    const { email, access } = useSelector((state) => state.auth);

    const messagesEndRef = useRef(null);

    const connectChat = () => {
        const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/?token=${encodeURIComponent(access)}`);
        setSocket(ws);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.command === 'messages') {
                setMessages(data.messages);
            } else if (data.command === 'new_message') {
                setMessages((prevMessages) => [...prevMessages, data.message]);
            }
        };

        return () => {
            ws.close();
        };
    }

    useEffect(() => {
        if (roomName) {
            connectChat()
        }
    }, [roomName]);

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (socket && newMessage.trim()) {
            const messageData = {
                command: 'new_message',
                message: newMessage,
                from: email,
                user_contact: "2",
                chatID: roomName,
            };
            socket.send(JSON.stringify(messageData));
            setNewMessage('');
        }
    };

    return (
        <Box className="flex flex-col h-screen bg-gray-100 p-4">
            <Paper elevation={3} className="flex-grow p-4 overflow-y-auto bg-white rounded-lg shadow-md">
                <Typography variant="h5" className="text-gray-800 mb-4">
                    Messages
                </Typography>
                <Box className="flex flex-col space-y-2">
                    {messages.map((message, index) => (
                        <Box
                            key={index}
                            className={`p-3 rounded-lg max-w-xs break-words ${
                                message.author === email
                                    ? 'bg-blue-500 text-white self-end'
                                    : 'bg-gray-200 text-gray-800 self-start'
                            }`}
                        >
                            <Typography 
                                variant="subtitle2" 
                                className={`font-semibold ${
                                    message.author === email
                                        ? 'text-yellow-300'
                                        : 'text-blue-600'
                                }`}
                            >
                                {message.author}
                            </Typography>
                            <Typography variant="body2">{message.content}</Typography>
                        </Box>
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
                        className: 'bg-white rounded-lg',
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
                    color="primary"
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
}

export default ChatRoom;
