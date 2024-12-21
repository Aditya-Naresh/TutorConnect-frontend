import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { WEBSOCKETSERVER } from "../../server";
import { useNavigate, useParams } from "react-router-dom";
import { endCall } from "../../redux/slices/callSlice";
import { updateTimeSlot } from "../../redux/thunk/timeSlotThunk";

const VideoCall = () => {
  const dispatch = useDispatch();
  const { isInCall, caller, receiver, ws, caller_name, receiver_name } =
    useSelector((state) => state.call);
  const { id, access } = useSelector((state) => state.auth);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const iceCandidateQueue = useRef([]);
  const callWs = useRef(null);
  const messageQueue = useRef([]);
  const endButtonRef = useRef();
  const navigate = useNavigate();
  const { timeSlotId } = useParams();
  useEffect(() => {
    if (isInCall) {
      startVideoCall();
    }
    return () => {
      if (!isInCall) endVideoCall();
    };
  }, [isInCall, access, dispatch]);

  const startVideoCall = async () => {
    callWs.current = new WebSocket(
      `${WEBSOCKETSERVER}/video/call/${id}/?token=${access}`
    );

    callWs.current.onopen = () => {
      console.log("WebSocket connection opened.");
      while (messageQueue.current.length > 0) {
        callWs.current.send(messageQueue.current.shift());
      }

      while (iceCandidateQueue.current.length > 0) {
        const candidate = iceCandidateQueue.current.shift();
        sendIceCandidate(candidate);
      }
    };

    callWs.current.onmessage = (message) =>
      handleSignalingData(JSON.parse(message.data));

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);

    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    stream
      .getTracks()
      .forEach((track) => peerConnection.current.addTrack(track, stream));

    peerConnection.current.ontrack = (event) => {
      const [remoteStream] = event.streams;
      setRemoteStream(remoteStream);
      if (remoteVideoRef.current)
        remoteVideoRef.current.srcObject = remoteStream;
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        if (callWs.current.readyState === WebSocket.OPEN) {
          sendIceCandidate(event.candidate);
        } else {
          iceCandidateQueue.current.push(event.candidate);
        }
      }
    };

    if (caller === id) {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      sendMessage({
        action: "offer",
        offer,
        target_user: receiver,
      });
    }
  };

  const sendMessage = (message) => {
    const serialzedMessage = JSON.stringify(message);
    if (callWs.current && callWs.current.readyState === WebSocket.OPEN) {
      callWs.current.send(serialzedMessage);
    } else {
      messageQueue.current.push(serialzedMessage);
    }
  };

  const sendIceCandidate = (candidate) => {
    sendMessage({
      action: "ice_candidate",
      type: "ICE_CANDIDATE",
      candidate,
      target_user: caller ? caller : receiver,
    });
  };

  const handleSignalingData = async (data) => {
    try {
      if (data.type === "OFFER") {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        sendMessage({ action: "answer", answer, target_user: caller });

        while (iceCandidateQueue.current.length > 0) {
          const candidate = iceCandidateQueue.current.shift();
          await peerConnection.current.addIceCandidate(candidate);
        }
      } else if (data.type === "ANSWER") {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );

        while (iceCandidateQueue.current.length > 0) {
          const candidate = iceCandidateQueue.current.shift();
          await peerConnection.current.addIceCandidate(candidate);
        }
      } else if (data.type === "ICE_CANDIDATE") {
        const candidate = new RTCIceCandidate(data.candidate);
        if (peerConnection.current.remoteDescription) {
          await peerConnection.current.addIceCandidate(candidate);
        } else {
          iceCandidateQueue.current.push(candidate);
        }
      } else if (data.type === "END_CALL") {
        endButtonRef.current.click();
      }
    } catch (error) {
      console.log("Error handling signaling data:", error);
    }
  };

  const endVideoCall = () => {
    try {
      if (callWs.current && callWs.current.readyState === WebSocket.OPEN) {
        sendMessage({
          action: "end_call",
          type: "END_CALL",
          target_user: id === caller ? receiver : caller,
        });
        callWs.current.close();
        callWs.current = null;
      }

      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop());
        setRemoteStream(null);
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
      }

      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        setLocalStream(null);
        if (localVideoRef.current) localVideoRef.current.srcObject = null;
      }

      if (peerConnection.current) {
        peerConnection.current.ontrack = null;
        peerConnection.current.onicecandidate = null;
        peerConnection.current.close();
        peerConnection.current = null;
      }

      if (callWs.current) {
        ref = { endButtonRef };
        callWs.current.onclose = () => {};
        callWs.current.close();
        callWs.current = null;
      }

      dispatch(endCall());
      dispatch(
        updateTimeSlot({
          id: timeSlotId,
          data: {
            className: "COMPLETED",
          },
          actionType: "completed",
        })
      );
      navigate("/");
    } catch (error) {
      console.error("Error ending video call: ", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1e293b",
        borderRadius: "1rem",
        overflow: "hidden",
        width: "100%",
        height: "100vh",
        padding: "2rem",
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          Video Call with {caller === id ? receiver_name : caller_name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#9ca3af" }}>
          Connected • Press "End Call" to disconnect
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* Remote Video */}
        <Box sx={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
          <video
            ref={remoteVideoRef}
            autoPlay
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "1rem",
              backgroundColor: "#374151",
              objectFit: "cover",
            }}
          />
          {/* Local Video (Picture-in-Picture) */}
          <Box
            sx={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              width: "120px",
              aspectRatio: "16/9",
            }}
          >
            <video
              ref={localVideoRef}
              autoPlay
              muted
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "1rem",
                backgroundColor: "#4b5563",
                objectFit: "cover",
                border: "2px solid #6b7280",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Button
          onClick={endVideoCall}
          ref={endButtonRef}
          variant="contained"
          color="error"
          sx={{
            backgroundColor: "#ef4444",
            "&:hover": { backgroundColor: "#dc2626" },
            paddingX: "2rem",
            paddingY: "1rem",
            borderRadius: "9999px",
            fontWeight: "medium",
            transition: "all 0.3s ease",
          }}
        >
          End Call
        </Button>
      </Box>
    </Box>
  );
};

export default VideoCall;
