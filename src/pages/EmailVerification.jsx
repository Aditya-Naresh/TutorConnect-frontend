import React from "react";
import { useParams } from "react-router-dom";

const EmailVerification = () => {
    const {uid, token} = useParams()
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            "uid" : uid,
            "token": token
        }
        console.log(data);
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
