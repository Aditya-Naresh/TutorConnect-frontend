import React from "react";
import { axiosPatch } from "../../axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ApproveTutor = ({id}) => {
  const token = useSelector((state) => state.auth.access)
  const navigate = useNavigate()
  const handleApprove = async () => {
    try {
      const response = await axiosPatch(`useradmin/update-user/${id}`, {"is_approved" : true}, token)
      console.log(response);
      if (response.status === 200){
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={handleApprove}>
      Approve
    </button>
  );
};

export default ApproveTutor;
