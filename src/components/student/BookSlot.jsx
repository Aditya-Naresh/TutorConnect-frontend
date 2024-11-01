import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosPatch } from '../../axios'
import { toast } from 'react-toastify'
import { withdrawMoney } from '../../redux/thunk/walletThunk'
import { useNavigate } from 'react-router-dom'
import { setRender } from '../../redux/slices/timeSlotSlice'

const BookSlot = ({slot_id, rate, selectedSubject}) => {
    const auth = useSelector((state) => state.auth)
    const {balance} = useSelector((state) => state.wallet)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleBook = async () =>{
        if (balance < rate){
            toast.error("Not enough balance in wallet")
            return
        }
        const formData = {
            "className" : "BOOKED",
            "student" : auth.id,
            "subject" : selectedSubject
        }

        try {
            const response = await axiosPatch(`timeslots/book-timeslot/${slot_id}`, formData, auth.access)
            console.log("response",response);
            if (response.status === 200){
                dispatch(setRender(`Booked ${response.data.id}`))
                dispatch(withdrawMoney({ amount: rate, time_slot: slot_id }));                
                toast.info("Time Slot has been booked")
                navigate('/tutorlist')
            }else if (response.status === 404){
                toast.error("Tutor or TimeSlot is unavailable please try another one")
                navigate('/tutorlist')
            }
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