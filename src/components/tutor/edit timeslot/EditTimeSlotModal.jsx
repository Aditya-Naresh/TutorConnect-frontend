import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Modal, Box, Typography, Paper, Stack } from '@mui/material'
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/en-in';
import CloseButton from './CloseButton'
import SaveButton from './SaveButton'
import { useSelector } from 'react-redux'

const EditTimeSlotModal = () => {
  const { id } = useParams()
  const [startTime, setStartTime] = useState(dayjs()) // Default to current time
  const {editSlotModal} = useSelector((state) => state.timeSlot)
  const handleTimeChange = (newTime) => {
    setStartTime(newTime)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-in'>
      <Modal
        open={editSlotModal} // Display the modal by setting open to true for design purposes
        aria-labelledby="edit-time-slot-modal"
        aria-describedby="edit-time-slot-modal-description"
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
            borderRadius: 2,
            p: 4,
          }}
        >
          <Paper elevation={3} sx={{ padding: '16px', mb: 2 }}>
            <Typography id="edit-time-slot-modal" variant="h6" component="h2" gutterBottom>
              Edit Time Slot {id}
            </Typography>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={handleTimeChange}
              renderInput={(params) => <input {...params} />}
            />
          </Paper>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <SaveButton timeSlotId={id} time={startTime} />
            <CloseButton />
          </Stack>
        </Box>
      </Modal>
    </LocalizationProvider>
  )
}

export default EditTimeSlotModal
