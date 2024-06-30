import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { axiosPost } from '../../axios';
import { toast } from 'react-toastify';

const AddDateForm = ({reRender}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const today = new Date().toISOString().split('T')[0];
  const auth = useSelector((state) => state.auth)
  const onSubmit = async (data) => {
    try {
      const response = await axiosPost('timeslots/create-tutor-dates/', data, auth.access)
      if (response.status === 201){
        toast.success(response.data.message)
        reRender("dates added")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[400px] w-full mx-auto bg-white p-8 shadow-lg rounded-md">
      <h2 className="text-4xl font-bold text-center py-4">Add Tutor Dates</h2>
      
      <div className="flex flex-col mb-4">
        <label htmlFor="start_date">Start Date</label>
        <input
          {...register("start_date", { required: "Start date is required" })}
          type="date"
          min={today}
          className="border bg-gray-100 p-2"
        />
        {errors.start_date && (
          <p className="text-red-500">{errors.start_date.message}</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="end_date">End Date</label>
        <input
          {...register("end_date", { required: "End date is required" })}
          type="date"
          min={today}
          className="border bg-gray-100 p-2"
        />
        {errors.end_date && (
          <p className="text-red-500">{errors.end_date.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Dates
      </button>
    </form>
  );
};

export default AddDateForm;
