import React from 'react';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { axiosPost } from '../axios';
import { useNavigate } from 'react-router-dom';

const ChatButton = ({useremail}) => {
    const {email, access} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const buttonClick = async () => {
        const data = {
            "participants" : [email, useremail]
        }
        const response = await axiosPost('chat/create/', data, access)
        console.log("response", response.data.id);
        navigate(`/chat/${response.data.id}`)
        
    }
  return (
    <div className="flex justify-center items-center">
      <Button
        variant="contained"
        color="primary"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
        size="small" 
        onClick={buttonClick}
      >
        Chat
      </Button>
    </div>
  );
};

export default ChatButton;
