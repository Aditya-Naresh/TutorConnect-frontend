import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <Button
      variant="contained"
      onClick={handleGoBack}
      startIcon={<ArrowBackIcon />}
      className="!bg-blue-500 !text-white !px-4 !py-2 !rounded-md !hover:bg-blue-600 !focus:ring-4 !focus:ring-blue-300 !shadow-lg"
      sx={{
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'blue.700',
        },
      }}
    >
      Go Back
    </Button>
  );
};

export default GoBackButton;
