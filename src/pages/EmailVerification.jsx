import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SERVER } from "../server";

const EmailVerification = () => {
    const navigate = useNavigate()
    const {uid, token} = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            "uid" : uid,
            "token": token
        }
        try {
            const response = await axios.post(`${SERVER}/accounts/verify-email/`, data)
            toast.success(response.data.message,{position:"top-center"})
            navigate('/login')
        } catch (error) {
          console.log(error);
          
            toast.error("Invalid confirmation link",{position:"top-center"})
        }
    }
  return (
    <div className="flex justify-center items-center h-full">
      <form
      onSubmit={handleSubmit} 
      className="max-w-[400px] w-full mx-auto bg-white p-8">
        <button className="w-full py-3 mt-8 bg-green-600 hover:bg-green-500 relative text-white">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
