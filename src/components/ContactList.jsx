import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Divider,
  Box,
  Badge,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER } from "../server";

const ContactList = () => {
  const { id, access } = useSelector((state) => state.auth);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const { roomName } = useParams();

  const handleClick = (contact) => {
    const user_id =
      contact.user2.id === id ? contact.user1.id : contact.user2.id;
    navigate(`/chat/${user_id}`);
  };

  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/chat-notifications/?token=${access}`
    );

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log("contacts:", data);

      setContacts(data.data);
    };

    socket.onclose = function () {
      console.error("WebSocket closed unexpectedly");
    };

    return () => socket.close();
  }, [roomName, access]);

  return (
    <Box className="flex flex-col h-screen bg-gray-100 p-4">
      <Paper elevation={3} className="bg-white rounded-lg shadow-md p-4">
        <Typography variant="h5" className="text-gray-800 mb-4">
          Contacts
        </Typography>
        <List className="space-y-2">
          {contacts.map((contact) => (
            <React.Fragment key={contact.id}>
              <ListItem
                button
                className="hover:bg-gray-100 rounded-lg"
                onClick={() => handleClick(contact)}
              >
                <ListItemAvatar>
                  <Badge
                    color="secondary"
                    badgeContent={contact.unseen_count}
                    invisible={!contact.unseen_count}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      src={
                        contact.user2.id == id
                          ? `${SERVER}${contact.user1.profile_pic}`
                          : `${SERVER}${contact.user2.profile_pic}`
                      }
                      className="bg-blue-500"
                    >
                      {contact.user2.id == id
                        ? contact.user1.full_name[0]
                        : contact.user2.full_name[0]}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      className="text-gray-900 font-semibold"
                    >
                      {contact.user2.id === id
                        ? contact.user1.full_name
                        : contact.user2.full_name}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ContactList;
