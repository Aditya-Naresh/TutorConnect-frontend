import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosPatch } from '../../axios'
import { toast } from 'react-toastify'
import { withdrawMoney } from '../../redux/thunk/walletThunk'
import { useNavigate } from 'react-router-dom'
import { setRender } from '../../redux/slices/timeSlotSlice'
import { Button } from "@mui/material";

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
            "subject" : selectedSubject,
            "rate": rate
        }

        try {
            const response = await axiosPatch(`timeslots/book-timeslot/${slot_id}`, formData, auth.access)
            console.log("response",response);
            if (response.status === 200){
                dispatch(setRender(`Booked ${response.data.id}`))
                dispatch(withdrawMoney({ amount: rate, time_slot: slot_id }));                
                toast.info("Time Slot has been booked", {position:"top-center"})
                navigate('/tutorlist')
            }else if (response.status === 404){
                toast.error("Tutor or TimeSlot is unavailable please try another one", {position:"top-center"})
                navigate('/tutorlist')
            }
        } catch (error) {
            console.log("error",error);
        }
    }
  return (
    <Button className='!bg-green-700 !text-white !font-bold  !rounded-lg !shadow hover:!bg-green-500 transition duration-200 w-48'
    onClick={handleBook}
    >Book</Button>
  )
}

export default BookSlot