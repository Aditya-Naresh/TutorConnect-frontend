import React, { useEffect, useState } from 'react'
import {axiosGet} from '../../axios'
import { useSelector } from 'react-redux'
import CancellationsTable from '../../components/admin/CancellationsTable'
const CancellationPage = () => {
  const {access} = useSelector((state) => state.auth)
  const [cancelledTimeSlot, setCancelledTimeSlot] = useState([])
  const {render} = useSelector((state) => state.timeSlot)
  const fetchCancelledTimeSlots = async () =>{
    const response = await axiosGet("useradmin/cancelled_timeslots/", access)
    setCancelledTimeSlot(response.data);
    
  }
  useEffect(() => {
    fetchCancelledTimeSlots()
  }, [render])
  return (
    <div className='mt-5 '>
      <CancellationsTable cancelledTimeSlots={cancelledTimeSlot} />
    </div>
  )
}

export default CancellationPage