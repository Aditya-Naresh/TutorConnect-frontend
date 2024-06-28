import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TutorProfile from "../components/tutor/TutorProfile";
import { useForm } from "react-hook-form";
import { axiosGet, axiosPatch } from "../axios";
import { toast } from "react-toastify";

const Profile = () => {
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.access);
  const [showTutorProfile, setShowTutorProfile] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const user_id = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosGet(`accounts/profile/${user_id}`, token);
        reset(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user_id, token, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosPatch(`accounts/profile/${user_id}`, data, token);
      console.log(response);
      toast.success('User details updated')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {role === "TUTOR" && (
        <button
          onClick={() => setShowTutorProfile(!showTutorProfile)}
          className="bg-slate-500 text-white font-bold py-2 px-4 rounded hover:bg-slate-600 -mt-4 mb-1"
        >
          {showTutorProfile ? "Show User Details" : "Show Subjects and Certifications"}
        </button>
      )}
      {showTutorProfile ? (
        <TutorProfile />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative max-w-[400px] w-full mx-auto bg-white p-8"
        >
          <h2 className="text-4xl font-bold text-center py-4">User Details</h2>
          <div className="flex flex-col mb-4">
            <label>Email</label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              className="border relative bg-gray-100 p-2"
              readOnly
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
                  noSpaces: (value) =>
                    !/\s/.test(value) || "First Name cannot contain spaces",
                  noNumbers: (value) =>
                    !/\d/.test(value) || "First Name cannot contain numbers",
                  noSpecialChars: (value) =>
                    /^[A-Za-z]+$/.test(value) ||
                    "First Name cannot contain special characters",
                },
              })}
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
                  noSpaces: (value) =>
                    !/\s/.test(value) || "Last Name cannot contain spaces",
                  noNumbers: (value) =>
                    !/\d/.test(value) || "Last Name cannot contain numbers",
                  noSpecialChars: (value) =>
                    /^[A-Za-z]+$/.test(value) ||
                    "Last Name cannot contain special characters",
                },
              })}
              type="text"
              className="border relative bg-gray-100 p-2"
            />
            {errors.last_name && (
              <p className="text-red-500 relative">{errors.last_name.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
