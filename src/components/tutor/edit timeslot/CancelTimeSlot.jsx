import React from "react";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  setActionType,
  setOpenConfirmationModalOn,
} from "../../../redux/slices/timeSlotSlice";
import { useDispatch } from "react-redux";

const CancelTimeSlot = ({enabled}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setActionType("cancel"));
    dispatch(setOpenConfirmationModalOn());
  };

  return (
    <Button
      variant="contained"
      disabled={!enabled}
      sx={{
        backgroundColor: "orange",
        color: "white",
        "&:hover": {
          backgroundColor: "darkorange",
        },
      }}
      startIcon={<CancelIcon />}
      className="!rounded-lg w-48"
      onClick={handleClick}
    >
      Cancel Booking
    </Button>
  );
};

export default CancelTimeSlot;
