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
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosGet } from "../axios";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const { full_name, access } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/chat/${id}`);
  };
  const fetchData = async () => {
    const response = await axiosGet("chat/chatlist/", access);
    console.log("response: ", response);
    setContacts(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box className="flex flex-col h-screen bg-gray-100 p-4">
      <Paper elevation={3} className="bg-white rounded-lg shadow-md p-4">
        <Typography variant="h5" className="text-gray-800 mb-4">
          Contacts
        </Typography>
        <List className="space-y-2">
          {contacts.map((contact) => (
            <React.Fragment key={contact.id}>
              <ListItem button className="hover:bg-gray-100 rounded-lg">
                <ListItemAvatar>
                  <Avatar className="bg-blue-500">{contact.avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      className="text-gray-900 font-semibold"
                    >
                      {contact.participants.find(
                        (participant) => participant !== full_name
                      )}
                    </Typography>
                  }
                  onClick={(e) => handleClick(contact.id)}
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
