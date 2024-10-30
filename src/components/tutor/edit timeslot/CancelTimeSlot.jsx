import React from 'react'
import Button from '@mui/material/Button'
import CancelIcon from '@mui/icons-material/Cancel'
import { setActionType, setOpenConfirmationModalOn } from '../../../redux/slices/timeSlotSlice'
import { useDispatch } from 'react-redux'

const CancelTimeSlot = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(setActionType('cancel'))
    dispatch(setOpenConfirmationModalOn())
  }

  return (
    <Button
      variant="contained"
      startIcon={<CancelIcon />}
      className="!bg-orange-500 !text-white !px-4 !py-2 !rounded-md !hover:bg-orange-600 !focus:ring-4 !focus:ring-orange-300"
      onClick={handleClick}
    >
      Cancel Time Slot
    </Button>
  )
}

export default CancelTimeSlot
