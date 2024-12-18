import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
      } = useForm();

      const navigate = useNavigate()
    
      const onSubmit = async (data) =>{
        try {
            const response = await axios.post("http://127.0.0.1:8000/accounts/reset-password/", data)
            if(response.status === 200){
                toast.success("Password Reset Link has been sent to your mail",{position:"top-center"})
                navigate('/login')
            }
        } catch (error) {
            toast.error(error.response.data.message,{position:"top-center"})
            console.log(error.response.data.message);
        }finally{
            reset()

        }
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