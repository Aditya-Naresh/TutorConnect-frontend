import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosPatch } from '../../axios'
import { withdrawMoney } from '../../redux/slices/walletSlice'

const BookSlot = ({slot_id, setRender, rate, selectedSubject}) => {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const handleBook = async () =>{
        const formData = {
            "className" : "BOOKED",
            "student" : auth.id,
            "subject" : selectedSubject
        }

        try {
            const response = await axiosPatch(`timeslots/${slot_id}`, formData, auth.access)
            console.log("response",response);
            setRender(response.data.id)
            // if (response.status === 200){
            //     dispatch(withdrawMoney(rate))
            // }
            setRender(response)
        } catch (error) {
            console.log("error",error);
        }
    }
  return (
    <button className='bg-green-700 text-white font-bold text-sm p-2'
    onClick={handleBook}
    >Book</button>
  )
}

export default BookSlot