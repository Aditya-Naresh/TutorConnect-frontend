import React from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { axiosPatch } from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateRole } from "../../redux/slices/authSlice";

const RoleSelectionButton = ({ label }) => {
  const { id, access } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async () => {
    const data = new FormData()
    data.append('role', label)
    try {
      const response = await axiosPatch(
        `accounts/profile/${id}`,
        data,
        access,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(updateRole(label));
        toast.info("Complete filling the profile details");
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      variant="contained"
      className="w-full !bg-emerald-600"
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

export default RoleSelectionButton;
