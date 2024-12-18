import React, { useState } from "react";
import VideoCall from "../components/videocall/VideoCall";

const Session = () => {
  return (
    <div className="w-full">
      {isInCall && <VideoCall s/>}
    </div>
  );
};

export default Session;
