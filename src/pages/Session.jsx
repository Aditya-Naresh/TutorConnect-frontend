import React from "react";
import VideoCall from "../components/videocall/VideoCall";
import WhiteBoard from "../components/videocall/WhiteBoard";

const Session = () => {
  return (
    <div className="flex flex-row h-screen w-full bg-gray-100">
      {/* Video Call Section */}
      <div className="w-1/2 h-full flex justify-start">
        <VideoCall />
      </div>

      {/* Whiteboard Section */}
      <div className="w-1/2 h-full ">
        <WhiteBoard />
      </div>
    </div>
  );
};

export default Session;
