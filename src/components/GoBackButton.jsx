import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
      <Button
        variant="contained"
        className="!bg-teal-800 !text-white !rounded-lg !shadow hover:!bg-teal-950 transition duration-200"
        onClick={handleGoBack}
        startIcon={<ArrowBackIcon />}
      >
        Go Back
      </Button>
  );
};

export default GoBackButton;
