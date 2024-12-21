import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Avatar, 
  IconButton, 
  Dialog, 
  DialogContent 
} from '@mui/material';
import { 
  FileText, 
  Image, 
  Download, 
  FileDown 
} from 'lucide-react';
import { SERVER } from '../server';

function MessageComponent({ message, id, attachment }) {
  const [openImageDialog, setOpenImageDialog] = useState(false);
  
  
  const isOwnMessage = message.user === id;

  const getAttachmentIcon = () => {
    if (!attachment) return null;

    // Check if it's an image
    if (attachment.toLowerCase().match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      return <Image className="text-blue-500" />;
    }

    // Check if it's a PDF
    if (attachment.toLowerCase().endsWith('.pdf')) {
      return <FileText className="text-red-500" />;
    }

    // Default file icon
    return <FileDown className="text-gray-500" />;
  };

  // Render attachment preview or download button
  const renderAttachment = () => {
    if (!attachment) return null;

    // Image attachment
    if (attachment.toLowerCase().match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      return (
        <Box className="mt-2">
          <img 
            src={`${SERVER}${attachment}`} 
            alt="Message attachment" 
            className="max-w-[300px] max-h-[300px] object-cover rounded-lg cursor-pointer"
            onClick={() => setOpenImageDialog(true)}
          />
          <Dialog 
            open={openImageDialog} 
            onClose={() => setOpenImageDialog(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogContent>
              <img 
                src={`${SERVER}${attachment}`} 
                alt="Full size attachment" 
                className="w-full object-contain"
              />
            </DialogContent>
          </Dialog>
        </Box>
      );
    }

    // Other file types (non-image)
    return (
      <Box className="flex items-center space-x-2 mt-2 p-2 bg-teal-600 rounded-lg">
        {getAttachmentIcon()}
        <Typography variant="body2" className="flex-grow">
          {attachment.split('/').pop()}
        </Typography>
        <IconButton 
          href={`${SERVER}${attachment}`}
          target="_blank" 
          rel="noopener noreferrer"
          size="small"
          className="!text-blue-600"
        >
          <Download size={20} />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box 
      className={`flex items-start space-x-2 ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isOwnMessage && (
        <Avatar className="!w-8 !h-8">
          {message.username ? message.username[0] : ''}
        </Avatar>
      )}
      
      <Box 
        className={`
          p-3 rounded-lg max-w-[70%] 
          ${
            isOwnMessage 
              ? 'bg-emerald-800 text-slate-200' 
              : 'bg-gray-200 text-black'
          }
        `}
      >
        {!isOwnMessage && (
          <Typography 
            variant="caption" 
            className="block mb-1 font-semibold text-gray-700"
          >
            {message.username}
          </Typography>
        )}
        
        {message.content && (
          <Typography variant="body1">
            {message.content}
          </Typography>
        )}
        
        {renderAttachment()}
        
        <Typography 
          variant="caption" 
          className={`block mt-1 text-xs ${
            isOwnMessage ? 'text-emerald-100' : 'text-gray-500'
          }`}
        >
          {new Date(message.timestamp).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
}

export default MessageComponent;
