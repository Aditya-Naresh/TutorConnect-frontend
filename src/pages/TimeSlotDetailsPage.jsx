import React, { useState } from 'react'
import TimeSlotDetails from '../components/TimeSlotDetails'
import EditTimeSlotModal from '../components/tutor/edit timeslot/EditTimeSlotModal'

const TimeSlotDetailsPage = () => {
  
  return (
    <>
        <TimeSlotDetails />
        <EditTimeSlotModal/>
    </>
  )
}

export default TimeSlotDetailsPage