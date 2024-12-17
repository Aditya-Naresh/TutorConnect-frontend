import React from "react";
import VideoCall from "../components/videocall/VideoCall";
import { useSelector } from "react-redux";

const Session = () => {
  const { isInCall } = useSelector((state) => state.call);
  return (
    <div>
      {isInCall && <VideoCall />}
    </div>
  );
};

export default Session;
