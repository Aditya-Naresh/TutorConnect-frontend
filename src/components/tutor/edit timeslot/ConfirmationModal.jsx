import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenConfirmationModalOff } from '../../../redux/slices/timeSlotSlice';
import { deleteTimeSlot, updateTimeSlot } from '../../../redux/thunk/timeSlotThunk';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ConfirmationModal = ({ open, actionType }) => {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth)
  const timeslot_id = useSelector((state) => state.timeSlot.event.id)
  const navigate = useNavigate()
  const handleClose = () => {
    dispatch(setOpenConfirmationModalOff())
  }

  const onCancel = async () => {
    const data = {
      "className" : "CANCELLED",
      "cancelled_by": id,
    }
    try {
      const response = await dispatch(updateTimeSlot({data:data, id:timeslot_id, actionType:"cancel"}))
      if (response.status === 200){
        dispatch(setOpenConfirmationModalOff())
      }
    } catch (error) {
      console.log("Unexpected Error",error);
      
    }
  }

  const onConfirm = () => {
    if (actionType === 'delete'){
      dispatch(deleteTimeSlot(timeslot_id))
      navigate(-1)
      toast.error("Time Slot Deleted")
      
    }else{
      onCancel()
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
        className="!shadow-lg"
      >
        <Typography
          id="confirmation-modal-title"
          variant="h6"
          component="h2"
          className="!mb-4"
        >
          {actionType === 'delete'
            ? 'Are you sure you want to delete this time slot?'
            : 'Are you sure you want to cancel this time slot?'}
        </Typography>

        <div className="!flex !justify-end !space-x-4">
          <Button
            variant="contained"
            startIcon={<CloseIcon />}
            onClick={handleClose}
            className="!bg-gray-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-gray-600"
          >
            Close
          </Button>

          <Button
            variant="contained"
            startIcon={actionType === 'delete' ? <DeleteIcon /> : <CloseIcon />}
            onClick={onConfirm}
            className={`!px-4 !py-2 !rounded-md !text-white ${
              actionType === 'delete'
                ? '!bg-red-500 hover:!bg-red-600'
                : '!bg-orange-500 hover:!bg-orange-600'
            }`}
          >
            {actionType === 'delete' ? 'Delete' : 'Cancel'}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
