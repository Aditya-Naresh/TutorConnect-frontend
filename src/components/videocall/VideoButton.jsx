import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { VideoCall } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startCall } from "../../redux/slices/callSlice";
import { useNavigate } from "react-router-dom";

const VideoButton = ({target_user, timeSlot}) => {
    const callWs = useSelector((state) => state.call.ws)
    const {id, profile_pic} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const receiver = target_user
  // define calling function
  const startVideoCall = () => {
    if (callWs.readyState === WebSocket.OPEN) {
      callWs.send(JSON.stringify({
        action: "call_request",
        target_user:receiver,
        timeSlot
      }))
      dispatch(startCall({
        caller: id,
        callerProfile: profile_pic,
        receiver: receiver
      }))
    }
  }
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
