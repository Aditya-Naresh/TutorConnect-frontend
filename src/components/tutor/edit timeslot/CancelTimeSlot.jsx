import React from "react";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  setActionType,
  setOpenConfirmationModalOn,
} from "../../../redux/slices/timeSlotSlice";
import { useDispatch } from "react-redux";

const CancelTimeSlot = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setActionType("cancel"));
    dispatch(setOpenConfirmationModalOn());
  };

  return (
    <Button
      variant="contained"
      startIcon={<CancelIcon />}
      className="!bg-orange-500 !text-white !rounded-lg !shadow hover:!bg-orange-600 transition duration-200 w-48"
      onClick={handleClick}
    >
      Cancel Booking
    </Button>
  );
};

export default CancelTimeSlot;
