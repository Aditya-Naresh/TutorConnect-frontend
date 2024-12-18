import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
      } = useForm();

      const {uid, token} = useParams()
      const navigate = useNavigate()

      const onSubmit = async (data) =>{
        const formData = {
            ... data,
            "uidb64" : uid,
            "token": token,
        }
        try {
          const response = await axios.patch("http://127.0.0.1:8000/accounts/set-new-password/", formData)
          if (response.status === 200){
            toast.success("Password reset successful",{position:"top-center"})
            navigate('/login')
          }
        } catch (error) {
            console.log(error);
            toast.error("Password reset failed",{position:"top-center"})
        }
        reset()
      }
  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[400px] w-full mx-auto bg-white p-8"
      >
        <h2 className="text-2xl font-bold text-center py-4">Enter New Password</h2>
        
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
                noSpaces: (value) =>
                  !/\s/.test(value) || "Password cannot contain spaces",
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Password must contain at least one uppercase letter",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) ||
                  "Password must contain at least one lowercase letter",
                hasNumber: (value) =>
                  /\d/.test(value) ||
                  "Password must contain at least one number",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Password must contain at least one special character",
              },
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
                noSpaces: (value) =>
                  !/\s/.test(value) || "Password cannot contain spaces",
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Password must contain at least one uppercase letter",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) ||
                  "Password must contain at least one lowercase letter",
                hasNumber: (value) =>
                  /\d/.test(value) ||
                  "Password must contain at least one number",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Password must contain at least one special character",
                matchesPassword: (value) =>
                  value === getValues("password") || "Passwords must match",
              },
            })}
            type="password"
            className="border relative bg-gray-100 p-2"
          />
          {errors.confirm_password && (
            <p className="text-red-500 relative">
              {errors.confirm_password.message}
            </p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
        >
          Reset Password
        </button>

       
      </form>
    </div>
  );
};

export default ResetPassword;
