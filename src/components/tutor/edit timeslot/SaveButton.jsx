import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save'
import { axiosPatch } from '../../../axios'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { setEditSlotModalOff, setRender } from '../../../redux/slices/timeSlotSlice'
import { updateTimeSlot } from '../../../redux/thunk/timeSlotThunk'

const SaveButton = ({timeSlotId, time}) => {
  const {access} = useSelector((state)=>state.auth)
  const today = dayjs()
  const dispatch = useDispatch()
  
  const date = dayjs(useSelector((state) => state.timeSlot.event.start))

  


  const handleClick = async () => {
    const start = dayjs(`${date.format("YYYY-MM-DD")} ${time.format("LT")}`);
    const end = start.add(1, 'hour')
    const data = {
      start : start,
    }
    
    try {
      const response = await dispatch(updateTimeSlot({id: timeSlotId, data: data, actionType:"editTime"}))
      console.log(response.payload);
      
      if (response.status === 200){
        dispatch(setEditSlotModalOff())
      } 
      
    } catch (error) {
      console.log(error);
      
    }
    
  }

  return (
    <Button
      variant="contained"
      startIcon={<SaveIcon />}
      onClick={handleClick}
      sx={{
        backgroundColor: 'green', 
        color: 'white', 
        padding: '8px 16px', 
        borderRadius: '4px', 
        transition: 'background-color 0.3s, transform 0.2s', 
        '&:hover': {
          backgroundColor: 'darkgreen', 
          transform: 'scale(1.05)', 
        },
        '&:focus': {
          ring: 4,
          ringColor: 'rgba(0, 255, 0, 0.5)', 
        },
      }}
    >
      Save
    </Button>
  )
}

export default SaveButton
