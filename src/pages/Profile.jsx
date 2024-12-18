import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TutorProfile from "../components/tutor/TutorProfile";
import { useForm } from "react-hook-form";
import { axiosGet, axiosPatch } from "../axios";
import { toast } from "react-toastify";

const Profile = ({ new_role }) => {
  const { role, access, id } = useSelector((state) => state.auth);
  const [showTutorProfile, setShowTutorProfile] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosGet(`accounts/profile/${id}`, access);
        console.log("useeffect:", response.data);

        reset(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, access, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "profile_pic") {
        if(value && value[0] instanceof File){
          formData.append(key, value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await axiosPatch(
        `accounts/profile/${id}`,
        formData,
        access,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("User details updated",{position:"top-center"});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {(role === "TUTOR" || new_role) && (
        <button
          onClick={() => setShowTutorProfile(!showTutorProfile)}
          className="bg-slate-500 text-white font-bold py-2 px-4 rounded hover:bg-slate-600 -mt-4 mb-1"
        >
          {showTutorProfile
            ? "Show User Details"
            : "Show Subjects and Certifications"}
        </button>
      )}
      {showTutorProfile ? (
        <TutorProfile />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative max-w-[400px] w-full mx-auto bg-white p-8"
          encType="multipart/form-data"
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
              <p className="text-red-500 relative">
                {errors.first_name.message}
              </p>
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
              <p className="text-red-500 relative">
                {errors.last_name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              {...register("phone_number", {
                required: "Phone Number is required",
                pattern: {
                  value: /^\+?1?\d{9,15}$/,
                  message:
                    "Phone number must be in the format '+999999999'. Up to 15 digits allowed.",
                },
              })}
              type="tel"
              className="border relative bg-gray-100 p-2"
            />
            {errors.phone_number && (
              <p className="text-red-500 relative">
                {errors.phone_number.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="profile_pic">Profile Picture</label>
            <input
              {...register("profile_pic")}
              type="file"
              accept="image/*"
              className="border relative bg-gray-100 p-2"
            />
            {errors.profile_pic && (
              <p className="text-red-500 relative">
                {errors.profile_pic.message}
              </p>
            )}
          </div>
          {(role === "TUTOR" || new_role) && (
            <div className="flex flex-col mb-4">
              <label htmlFor="rate">Rate per Hour</label>
              <input
                {...register("rate", {
                  required: "Rate is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message:
                      "Rate must be a decimal with up to 2 digits after the point",
                  },
                })}
                type="number"
                step="0.01"
                className="border relative bg-gray-100 p-2"
              />
              {errors.rate && (
                <p className="text-red-500 relative">{errors.rate.message}</p>
              )}
            </div>
          )}
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
