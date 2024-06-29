import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BsPlus } from "react-icons/bs";
import { axiosPatch, axiosPost } from "../../axios";
const SubjectForm = ({ reRender }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const token = useSelector((state) => state.auth.access);
  const user_id = useSelector((state) => state.auth.id)
  const onSubmit = async (formData) => {
    try {
      const response = await axiosPost("accounts/subject/", formData, token);
      console.log(response);
      if (response.status === 201) {
        await axiosPatch(
          `accounts/profile/${user_id}`,
          { is_approved: false },
          token
        );
        toast.success("The subject was added");
        reRender(`${formData}`);
        reset();
      } else {
        toast.error("The subject is already in the list");
      }
    } catch (error) {
      console.error("Error adding subject:", error);
      toast.error("Error adding subject");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative max-w-[400px] w-full mx-auto bg-emerald-200  shadow-lg ring-2 ring-gray-300 ring-offset-2 ring-offset-gray-100"
    >
      <div className="flex items-center space-x-2">
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Subject Name"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          disabled = {isSubmitting}
        >
          <BsPlus />
        </button>
      </div>
      {errors.name && <p className="text-red-500">Subject name is required</p>}
    </form>
  );
};

export default SubjectForm;
