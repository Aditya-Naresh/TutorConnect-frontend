import React, { useState } from "react";
import VideoCall from "../components/videocall/VideoCall";
import WhiteBoard from "../components/videocall/WhiteBoard";

const Session = () => {
  const [showWhiteboard, setShowWhiteboard] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row h-screen">
        <VideoCall />
        {showWhiteboard && <WhiteBoard />}
      </div>
    </div>
  );
};

export default Session;
