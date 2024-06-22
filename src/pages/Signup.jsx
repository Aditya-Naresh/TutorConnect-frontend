import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import loginImg from "../assets/E-learning3.jpg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormSwitch from "../components/FormSwitch";
import { toast } from "react-toastify";
import axios from "axios";



const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
      } = useForm();

      const [isTutor, setIsTutor] = useState(false)
      const navigate = useNavigate()
      const onSubmit = async (data) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const formData = {
            ... data,
            "is_tutor" : isTutor
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/accounts/signup/", formData, config)
            if (response.status === 201){
                toast.success(response.data.message)
                navigate('/login')

            }
        } catch (error) {
            if(error.response.data.message){
              toast.error(error.response.data.message)
              navigate('/login')
            }else{
              toast.error("Sign up failed")
            }
        }
        
        reset();
      };
  return (
    <div className="relative w-full h-screen db-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginImg}
        alt="/"
      />

      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[400px] w-full mx-auto bg-white p-8"
        >
            <span className="flex justify-center relative">

        <FormSwitch isTutor={isTutor} setIsTutor={setIsTutor}/>
            </span>
          <h2 className="text-4xl font-bold text-center py-4">{isTutor? "Tutor " : "Student "}Sign Up</h2>
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
          <button
            disabled={isSubmitting}
            className="w-full py-3 mt-8 bg-green-600 hover:bg-green-500 relative text-white"
          >
            Sign Up
          </button>

          <p className="text-center mt-4 relative">
            Already have an account? {" "}
             <Link to={"/login"}>
            Sign In
            </Link> 
          </p>
          <div className="flex justify-center">
            <p className="border shadow-lg hover:shadow-2xl px-6 py-2 relative flex item-center ">
              <FcGoogle className="mr-2 mt-1" /> Continue with google
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup