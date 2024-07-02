import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { axiosPost } from '../../axios';
import { toast } from 'react-toastify';

const TimeSlotForm = ({date_id, reRender}) => {
  const { register, handleSubmit } = useForm();
  const auth = useSelector((state) => state.auth)
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      "date" : date_id
    }
    try {
      const response = await axiosPost(`timeslots/timeSlots/${date_id}`, formData, auth.access)
      console.log(response);
      toast.success("time slot added")
      reRender(`time slot added ${response.data.id}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4 h-full bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Create Time Slot</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700">Start Time</label>
        <input
          type="time"
          {...register('start_time', { required: true })}
          className="w-full border p-2 rounded mt-1"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default TimeSlotForm;
