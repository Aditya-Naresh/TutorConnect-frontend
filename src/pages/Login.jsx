import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import GoogleAuth from "../components/Signup/GoogleAuth";
import { SERVER } from "../server";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${SERVER}/accounts/login/`, data)
      if (response.status === 200) {
        dispatch(loginSuccess(response.data));
        toast.success(`${response.data.full_name} has successfully logged in`, {position: "top-center"});
        navigate('/')
        reset();
      } else {
        toast.error("Login Failed. Please try again.",{position:"top-center"});
      }
    } catch (error) {
      if (error.response.status === 403) {
        toast.error("Incorrect email or password. Please try again.",{position:"top-center"});
      } else {
        toast.error(error.response.data.detail,{position:"top-center"});
      }
      console.log(error);
    
    }
  
  };

  return (
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[400px] w-full mx-auto bg-white p-8"
        >
          <h2 className="text-4xl font-bold text-center py-4">Login</h2>
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
          <div className="flex flex-col ">
            <label htmlFor="">Password</label>
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
          <button
            disabled={isSubmitting}
            className="w-full py-3 mt-8 bg-green-600 hover:bg-green-500 relative text-white"
          >
            Sign In
          </button>
          <p className="text-center mt-4 relative">
          <Link to={"/forgot-password"} className="text-blue-700">
          Forgot your password?{" "}
            
          </Link>
        </p>
          <p className="text-center mt-2 relative">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-indigo-700">
            Sign up
            </Link>
          </p>
        <GoogleAuth />
          
        </form>
      </div>
  );
};

export default Login;
