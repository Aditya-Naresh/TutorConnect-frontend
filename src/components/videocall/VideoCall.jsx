import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { WEBSOCKETSERVER } from "../../server";
import { useNavigate, useParams } from "react-router-dom";
import { endCall } from "../../redux/slices/callSlice";

const VideoCall = () => {
  const dispatch = useDispatch();
  const { isInCall, caller, receiver, ws, caller_name, receiver_name } = useSelector((state) => state.call);
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
      navigate("/");

    } catch (error) {
      console.error("Error ending video call: ", error);
    }
  };

  return (
    <Dialog open={isInCall} maxWidth="sm" fullWidth>
      <DialogContent className="bg-teal-900 text-white p-6 rounded-lg">
        {/* Header Section */}
        <div className="text-center mb-6">
          <DialogTitle className="text-2xl font-semibold text-white">
            Video Call with {caller == id ? receiver_name : caller_name}
          </DialogTitle>
          <p className="text-sm text-teal-400">
            In a video call. Press "End Call" to disconnect.
          </p>
        </div>

        {/* Video Streams */}
        <div className="flex flex-col items-center space-y-4">
          {/* Local Video */}
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-24 h-24 rounded-lg border border-teal-700"
          />
          {/* Remote Video */}
          <video
            ref={remoteVideoRef}
            autoPlay
            className="w-full max-w-xl h-80 rounded-lg border border-teal-700"
          />
        </div>
      </DialogContent>

      {/* Footer Section */}
      <DialogActions className="bg-teal-900 flex justify-center p-4">
        <Button
          onClick={endVideoCall}
          ref={endButtonRef}
          variant="contained" 
          color="error" 
          className="!px-6 !py-2 !rounded-lg hover:!bg-red-600 !transition"
        >
          End Call
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VideoCall;
