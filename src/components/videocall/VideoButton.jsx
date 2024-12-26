import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { VideoCall } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startCall } from "../../redux/slices/callSlice";
import { updateTimeSlot } from "../../redux/thunk/timeSlotThunk";
import { useParams } from "react-router-dom";

const VideoButton = ({ target_user, target_user_name, timeSlot, enabled }) => {
  const callWs = useSelector((state) => state.call.ws);
  const { id, profile_pic, full_name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const receiver = target_user;
  const receiver_name = target_user_name;
  const { timeSlotId } = useParams();
  // define calling function
  const startVideoCall = () => {
    if (callWs.readyState === WebSocket.OPEN) {
      callWs.send(
        JSON.stringify({
          action: "call_request",
          target_user: receiver,
          target_user_name: receiver_name,
          timeSlot,
        })
      );
      dispatch(
        startCall({
          caller: id,
          caller_name: full_name,
          callerProfile: profile_pic,
          receiver: receiver,
          receiver_name: receiver_name,
        })
      );
      dispatch(
        updateTimeSlot({
          id: timeSlotId,
          data: {
            className: "ONGOING",
          },
          actionType: "ongoing",
        })
      );
    }
  };
  return (
    <Button
      variant="contained"
      startIcon={<VideoCall />}
      onClick={() => startVideoCall()}
      className="!rounded-lg"
      disabled={!enabled}
      sx={{
        backgroundColor: "teal",
        color: "white",
        "&:hover": {
          backgroundColor: "darkcyan",
        },
      }}
    >
      Start Video Call
    </Button>
  );
};

export default VideoButton;
