import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { VideoCall } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startCall } from "../../redux/slices/callSlice";

const VideoButton = ({ target_user, target_user_name, timeSlot }) => {
  const callWs = useSelector((state) => state.call.ws);
  const { id, profile_pic, full_name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const receiver = target_user;
  const receiver_name = target_user_name
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
    }
  };
  return (
    <Button
      variant="contained"
      startIcon={<VideoCall />}
      onClick={() => startVideoCall()}
      className="!rounded-lg"
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
