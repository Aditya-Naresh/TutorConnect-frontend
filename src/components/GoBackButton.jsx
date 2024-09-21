import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleGoBack}
      sx={{
        textTransform: 'none', 
        boxShadow: 2, 
        '&:hover': {
          backgroundColor: 'primary.dark', 
        },
      }}
    >
      Go Back
    </Button>
  );
};

export default GoBackButton;
