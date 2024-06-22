import React from 'react'
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
      } = useForm();
    
      const onSubmit = async (data) =>{
        console.log(data);
      }
  return (
    <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[400px] w-full mx-auto bg-white p-8"
        >
          <h2 className="text-2xl font-bold text-center py-4">Enter the Registered Email Address</h2>
          <div className="flex flex-col mb-4">
            <label htmlFor="">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              className="border relative bg-gray-100 p-2"
            />
            {errors.email && (
                <p className="text-red-500 relative">{errors.email.message}</p>
            )}
          </div>
        
          <button
            disabled={isSubmitting}
            className="w-full py-3 mt-8 bg-green-600 hover:bg-green-500 relative text-white"
          >
            Send password reset Link
          </button>
         
        </form>
      </div>
  )
}

export default ForgotPassword