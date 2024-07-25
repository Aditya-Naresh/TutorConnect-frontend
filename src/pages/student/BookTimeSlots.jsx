import React from 'react'
import Calendar from '../../components/Calendar'
const BookTimeSlots = () => {
  return (
    <div className='w-full h-[600px] overflow-auto'>
      <div className='flex justify-center items-center'>
          <h1 className='font-bold text-3xl text-green-300 lg:text-5xl '>Book Slots</h1>
      </div>
      <Calendar />
    </div>
  )
}

export default BookTimeSlots