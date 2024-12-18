import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Typography, Box, CircularProgress } from "@mui/material";
import { Phone, PhoneDisabled } from "@mui/icons-material";
import { acceptCall, declineCall } from "../../redux/slices/callSlice";
import { useNavigate } from "react-router-dom";

const IncomingCallNotification = () => {
  const dispatch = useDispatch();
  const { incomingCall, ws, callerImage, isInCall } = useSelector(
    (state) => state.call
  );
  const declineButton = useRef();
  const audioRef = useRef(new Audio("/call.mp3"));
  const navigate = useNavigate()
  const handleAudioPlay = () => {
    audioRef.current.loop = true;
    audioRef.current.play().catch((error) => {
      console.log("Audio Playback failed: ", error);
    });
  };

  useEffect(() => {
    handleAudioPlay();
    setTimeout(() => {
      if (incomingCall && !isInCall) {
        declineButton.current.click();
      }
    }, 100000);

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [incomingCall]);

  const handleAccept = () => {
    ws.send(
      JSON.stringify({
        action: "accept_call",
        target_user: incomingCall.from,
        target_user_name:incomingCall.from_user_name,
        timeSlot: incomingCall.timeSlot
      })
    );
    dispatch(acceptCall());
    navigate(`/session/${incomingCall.timeSlot}`)
  };

  const handleDecline = () => {
    ws.send(
      JSON.stringify({ action: "reject", target_user: incomingCall.from })
    );
    dispatch(declineCall());
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 50,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        minWidth: 320,
        animation: "slideIn 0.3s ease-in-out",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {/* Avatar */}
        <Box sx={{ position: "relative" }}>
          {callerImage ? (
            <Avatar
              src={callerImage}
              sx={{
                width: 48,
                height: 48,
                border: 2,
                borderColor: "success.main",
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: "success.light",
                color: "success.dark",
              }}
            >
              {incomingCall?.from}
            </Avatar>
          )}

          {/* Calling animation dots */}
          <Box
            sx={{
              position: "absolute",
              bottom: -4,
              right: -4,
              display: "flex",
              gap: 0.5,
            }}
          >
            {[0, 150, 300].map((delay) => (
              <CircularProgress
                key={delay}
                size={8}
                sx={{
                  color: "success.main",
                  animationDelay: `${delay}ms`,
                  animation: "bounce 1.5s infinite",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Call info */}
        <Box flex={1}>
          <Typography variant="subtitle1" color="text.primary" fontWeight="medium">
            {incomingCall?.from}
          </Typography>
          <Typography
            variant="body2"
            color="success.main"
            display="flex"
            alignItems="center"
            gap={0.5}
          >
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                bgcolor: "success.main",
                borderRadius: "50%",
                animation: "pulse 1.5s infinite",
              }}
            />
            Incoming call...
          </Typography>
        </Box>

        {/* Accept and Decline buttons */}
        <Box>
          <Button
            variant="contained"
            color="success"
            onClick={handleAccept}
            startIcon={<Phone />}
            sx={{ marginRight: 1 }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDecline}
            startIcon={<PhoneDisabled />}
            ref={declineButton}
          >
            Decline
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default IncomingCallNotification;
