import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { updateField } from '../../redux/slices/signUpSlice';

const Step4 = ({setCurrentStep}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data.rate);
    dispatch(updateField({ field: 'rate', value: data.rate }));
    setCurrentStep(5)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[400px] w-full mx-auto bg-white p-8 shadow-lg space-y-4 relative"
    >
      <div>
        <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
          Rate per Hour ($)
        </label>
        <input
          type="number"
          id="rate"
          {...register('rate', { 
            required: 'Rate is required',
            min: {
              value: 80,
              message: 'Rate must be at least $80'
            }
          })}
          className={`mt-1 block w-full p-2 border ${errors.rate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="Enter your rate per hour"
          step="0.01"
          min="80"
        />
        {errors.rate && <p className="mt-2 text-sm text-red-600">{errors.rate.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
}

export default Step4;
