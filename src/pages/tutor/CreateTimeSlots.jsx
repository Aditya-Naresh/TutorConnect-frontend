import React, { useState } from 'react';
import MyStaticDatePicker from '../../components/calendars/MyStaticDatePicker';
import dayjs from 'dayjs';
import MyStaticTimePicker from '../../components/calendars/MyStaticTimePicker';
import MyButton from '../../components/forms/createform/MyButton';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { axiosPost } from '../../axios';
import { useSelector } from 'react-redux';
import utc from 'dayjs/plugin/utc';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(utc);
dayjs.extend(isSameOrBefore);


const CreateTimeSlots = () => {
  const today = dayjs();
  const tomorrow = today.add(1, 'day');

  const [selectedDate, setSelectedDate] = useState(today);
  const [showTimeForm, setShowTimeForm] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const minTime = startTime ? dayjs(startTime).add(1, 'hour') : null;

  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!startTime || !endTime) {
      toast.warning("You have to select both start time and end time.");
      return;
    }
  
    console.log('Raw Start Time:', startTime);
    console.log('Raw End Time:', endTime);
    console.log("Hello World", selectedDate);
    
  
    const start = dayjs(`${selectedDate.format("YYYY-MM-DD")} ${startTime.format("LT")}`);
    const end = dayjs(`${selectedDate.format("YYYY-MM-DD")} ${endTime.format("LT")}`);
  
    console.log('Day.js Start:', start);
    console.log('Day.js End:', end);

    
  
    if (end.isSameOrBefore(start)) {
      toast.warning("End time must be after start time.");
      return;
    }
  
   
  
    const data = {
      start_time: start,
      end_time: end,
    };
  
    console.log("Request Payload:", data);
  
    try {
      const response = await axiosPost(
        "timeslots/create-timeslots/",
        data,
        auth.access
      );
      console.log(response);
      toast.info(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create time slots. Please try again.");
    }
  };
  

  return (
    <div>
      <h2 className="font-bold text-3xl lg:text-5xl flex justify-center">Create Time Slots</h2>
      <form onSubmit={handleSubmit}>

        {/* Date Picker */}
        {!showTimeForm && (
          <MyStaticDatePicker
            today={tomorrow}
            setSelectedDate={setSelectedDate}
            setShowTimeForm={setShowTimeForm}
          />
        )}

        {/* Start Time Picker */}
        {showTimeForm && (
          <MyStaticTimePicker
            label={"Start Time"}
            selectedTime={startTime}
            setSelectedTime={setStartTime}
            startTime={selectedDate.startOf('day')}
          />
        )}

        {/* End Time Picker */}
        {showTimeForm && (
          <MyStaticTimePicker
            label={"End Time"}
            selectedTime={endTime}
            setSelectedTime={setEndTime}
            startTime={minTime}
          />
        )}

        <Box sx={{ marginTop: '4px' }}>
          {showTimeForm && <MyButton type={"submit"} label={"Create Time Slots"} />}
        </Box>
      </form>
    </div>
  );
};

export default CreateTimeSlots;
