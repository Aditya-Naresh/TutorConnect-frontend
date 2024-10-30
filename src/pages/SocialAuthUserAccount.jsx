import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import FormSwitch from "../components/FormSwitch";
import RoleSelectionButton from "../components/utils/RoleSelectionButton";
import { Paper, Typography } from "@mui/material";
import { refreshAccessToken } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const SocialAuthUserAccount = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshAccessToken());
      
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <Typography variant="h5" className="text-center mb-6">
          Select Role
        </Typography>
        <Paper elevation={3} className="p-6 rounded-lg bg-white">
          <div className="flex justify-between space-x-4">
            <RoleSelectionButton label="TUTOR" />
            <RoleSelectionButton label="STUDENT" />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default SocialAuthUserAccount;
