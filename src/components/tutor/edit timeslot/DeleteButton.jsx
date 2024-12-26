import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { setActionType, setOpenConfirmationModalOn } from '../../../redux/slices/timeSlotSlice';
import { useDispatch } from 'react-redux';

const DeleteButton = () => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(setActionType("delete"))
    dispatch(setOpenConfirmationModalOn())
  };

  return (
    <Button
      variant="contained"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
      className="!bg-red-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-red-600 focus:!ring-4 focus:!ring-red-300 !shadow-md"
      sx={{
        textTransform: 'none',
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
