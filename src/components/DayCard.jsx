import React, { useEffect, useState } from "react";
import TimeSlotForm from "./tutor/TimeSlotForm";
import { CgClose } from "react-icons/cg";
import { PiPlusBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { axiosGet } from "../axios";
import BookSlot from "./student/BookSlot";

const DayCard = ({ date, reRender, render }) => {
  const [showForm, setShowForm] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axiosGet(
          `timeslots/timeSlots/${date.id}`,
          auth.access
        );
        setTimeSlots(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTimeSlots();
  }, [render]);
  return (
    <div className="p-4 bg-lime-200 shadow-md rounded-md text-center m-2 h-full">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{date.date}</h3>

        {auth.role === 'TUTOR' && <button
          onClick={() => setShowForm(!showForm)}
          className={`bg-slate-700 p-2  mb-2 ${
            showForm ? "text-red-500" : "text-green-500"
          }`}
        >
          {showForm ? <CgClose /> : <PiPlusBold />}
        </button>}
      </div>
      {showForm ? (
        <div className="h-48">
        <TimeSlotForm reRender={reRender} date_id={date.id} />
        </div>
      ) : (
        <div className="space-y-2 h-40">
      {timeSlots.map((slot) => (
        <div
          key={slot.id}
          className={`p-2 rounded shadow flex justify-between ${
            slot.is_booked ? 'bg-red-200' : 'bg-green-200'
          }`}
        >
          <span className="font-semibold">Start:</span> {slot.start_time} to 
          <span className="font-semibold ">End:</span> {slot.end_time}

          {auth.role === 'STUDENT' && <>
            {slot.is_booked? "" :<BookSlot slot_id={slot.id} /> }
          </>}
        </div>
      ))}
    </div>
      )}
    </div>
  );
};

export default DayCard;
