import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateField } from '../../redux/slices/signUpSlice';
import GoogleAuth from './GoogleAuth';

const Step1 = ({setCurrentStep , isTutor}) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm();
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        console.log(data);
        
        for (const [field, value] of Object.entries(data)) {
            dispatch(updateField({ field, value }));
          }
        if (isTutor) {
          setCurrentStep(2)
        }else{
          setCurrentStep(5)
        }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex flex-col mb-4">
            <label htmlFor="first_name">First Name</label>
            <input
              {...register("first_name", {
                required: "First Name is required",
                validate: {
                    noSpaces: value => !/\s/.test(value) || "First Name cannot contain spaces",
                    noNumbers: value => !/\d/.test(value) || "First Name cannot contain numbers",
                    noSpecialChars: value => /^[A-Za-z]+$/.test(value) || "First Name cannot contain special characters",
                  },
              },
            )}
              type="text"
              className="border relative bg-gray-100 p-2"
            />
            {errors.first_name && (
                <p className="text-red-500 relative">{errors.first_name.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="last_name">Last Name</label>
            <input
              {...register("last_name", {
                required: "Last Name is required",
                validate: {
                    noSpaces: value => !/\s/.test(value) || "Last Name cannot contain spaces",
                    noNumbers: value => !/\d/.test(value) || "Last Name cannot contain numbers",
                    noSpecialChars: value => /^[A-Za-z]+$/.test(value) || "Last Name cannot contain special characters",
                  },
              })}
              type="text"
              className="border relative bg-gray-100 p-2"
            />
            {errors.last_name && (
                <p className="text-red-500 relative">{errors.last_name.message}</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be atleast 8 characters",
                },
                validate: {
                    noSpaces: value => !/\s/.test(value) || "Password cannot contain spaces",
                    hasUpperCase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                    hasLowerCase: value => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                    hasNumber: value => /\d/.test(value) || "Password must contain at least one number",
                    hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character",
              
                }
              })}
              type="password"
              className="border relative bg-gray-100 p-2"
            />
            {errors.password && (
                <p className="text-red-500 relative">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              {...register("confirm_password", {
                required: "Password confirmation is required",
                minLength: {
                  value: 8,
                  message: "Password must be atleast 8 characters",
                },
                validate: {
                    noSpaces: value => !/\s/.test(value) || "Password cannot contain spaces",
                    hasUpperCase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                    hasLowerCase: value => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                    hasNumber: value => /\d/.test(value) || "Password must contain at least one number",
                    hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character",
                    matchesPassword: value =>  value === getValues("password") || "Passwords must match"
              
                }
              })}
              type="password"
              className="border relative bg-gray-100 p-2"
            />
            {errors.confirm_password && (
                <p className="text-red-500 relative">{errors.confirm_password.message}</p>
            )}
          </div>
            <div className='w-full flex-row'>

          <button
            disabled={isSubmitting}
            className="w-full py-3 mt-8 bg-blue-600 hover:bg-blue-600/90 relative text-white"
            >
            Next
          </button>
          <div className='flex-row justify-center  w-full'>
          <GoogleAuth />
            </div>
              </div>
    </form>
  )
}

export default Step1