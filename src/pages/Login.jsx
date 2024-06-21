import React from "react";
import { FcGoogle } from "react-icons/fc";
import loginImg from "../assets/E-learning3.jpg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1000));
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
            Don't have an account?{" "}
            <Link to={"/signup"}>
            Sign up
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
  );
};

export default Login;
