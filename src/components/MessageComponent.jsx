import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const MessageComponent = ({ message, id }) => {
    const isOwnMessage = message.user === id

    return (
        <Box
            className={`p-3 rounded-lg max-w-xs break-words ${isOwnMessage ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}
        >
            <Typography variant="subtitle2" className={`${isOwnMessage ? 'text-yellow-300' : 'text-blue-600'} font-semibold`}>
                {message.username} {message.user_id}
            </Typography>
            <Box className="flex items-center mt-1 mb-2">
                <Typography variant="body2" className='opacity-80'>
                    {message.content}
                </Typography>
            </Box>
            
        </Box>
    );
};

export default MessageComponent;
