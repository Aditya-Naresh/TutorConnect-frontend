import React from 'react'
import { useSelector } from 'react-redux'
import { axiosPatch } from '../../axios'

const BookSlot = ({slot_id}) => {
    const auth = useSelector((state) => state.auth)

    const handleBook = async () =>{
        const formData = {
            "is_booked" : true,
            "booked_by" : auth.id
        }

        try {
            const response = await axiosPatch(`timeslots/BooktimeSlots/${slot_id}`, formData, auth.access)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <button className='bg-green-500 text-white font-bold text-sm p-2'
    onClick={handleBook}
    >Book</button>
  )
}

export default BookSlot