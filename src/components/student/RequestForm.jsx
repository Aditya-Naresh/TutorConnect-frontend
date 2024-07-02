import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { axiosPost } from '../../axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

const RequestForm = ({ subjects, tutorId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      student: auth.id,
      tutor: tutorId,
      is_accepted:false,
      tutor_viewed : false,
      student_viewed : false

    }
    console.log(data.subject);
    try {
      const response = await axiosPost('timeslots/tuition-request/', formData, auth.access)
      console.log(response);
      if (response.status === 201){
        toast.success("Request sent to Tutor")
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[90%] sm:max-w-[400px] w-full mx-auto bg-emerald-200 p-4 sm:p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Tutor Request</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Select Subject:</label>
          <select
            id="subject"
            {...register('subject')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
         >
            <option value="">Select a Subject</option>
            {subjects?.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
        </div>
        <div className="mb-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message to Tutor:</label>
          <textarea
            id="message"
            {...register('message')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={4}
            placeholder="Enter your message to the tutor..."
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 text-sm md:text-lg rounded-md w-full sm:w-auto hover:bg-blue-600 transition-colors duration-300"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
