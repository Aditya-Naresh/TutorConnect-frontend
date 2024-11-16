import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChatButton = ({ user_id }) => {
    const navigate = useNavigate();

    const buttonClick = async () => {
        navigate(`/chat/${user_id}`);
    };

    return (
        <div className="flex justify-center items-center">
            <Button
                variant="contained"
                className="!px-4 !py-2 !bg-emerald-500 !text-white !rounded-lg !shadow hover:!bg-emerald-600 transition duration-200"
                size="small"
                onClick={buttonClick}
            >
                Chat
            </Button>
        </div>
    );
};

export default ChatButton;
