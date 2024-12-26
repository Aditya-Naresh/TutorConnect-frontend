import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Typography, Box, CircularProgress } from "@mui/material";
import { PhoneDisabled } from "@mui/icons-material";
import { declineCall } from "../../redux/slices/callSlice";

const OutgoingCall = () => {
  const { receiver, isCallingProfile, ws, receiver_name } = useSelector((state) => state.call);
  const dispatch = useDispatch();

  const handleDecline = () => {
    ws.send(JSON.stringify({ action: "abandon_call", target_user: receiver }));
    dispatch(declineCall());
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 50,
        animation: "slideIn 0.3s ease-in-out",
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        minWidth: 320,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {/* Avatar */}
        <Box sx={{ position: "relative" }}>
          {isCallingProfile ? (
            <Avatar
              src={isCallingProfile}
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
              {receiver_name}
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
            {receiver_name}
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
            Calling...
          </Typography>
        </Box>

        {/* Decline button */}
        <Button
          onClick={handleDecline}
          variant="contained"
          color="error"
          startIcon={<PhoneDisabled />}
        >
          Decline
        </Button>
      </Box>
    </Box>
  );
};

export default OutgoingCall;
