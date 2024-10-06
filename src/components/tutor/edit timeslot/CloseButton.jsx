import React from 'react'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import { setEditSlotModalOff } from '../../../redux/slices/timeSlotSlice'

const CloseButton = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(setEditSlotModalOff())
  }

  return (
    <Button
      variant="contained"
      startIcon={<CloseIcon />}
      onClick={handleClick}
      sx={{
        backgroundColor: 'red', 
        color: 'white', 
        padding: '8px 16px', 
        borderRadius: '4px', 
        '&:hover': {
          backgroundColor: 'darkred', 
        },
        '&:focus': {
          ring: 4,
          ringColor: 'rgba(255, 0, 0, 0.5)', 
        },
      }}
    >
      Close
    </Button>
  )
}

export default CloseButton
