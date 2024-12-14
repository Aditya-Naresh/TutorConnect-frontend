import React from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { setEditSlotModalOff } from '../../../redux/slices/timeSlotSlice';

const CloseButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setEditSlotModalOff());
  };

  return (
    <Button
      variant="contained"
      startIcon={<CloseIcon />}
      onClick={handleClick}
      className="!bg-gray-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-gray-700 focus:ring-4 focus:ring-gray-300"
    >
      Close
    </Button>
  );
};

export default CloseButton;
