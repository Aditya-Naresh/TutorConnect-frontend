import React, { useState } from "react";
import VideoCall from "../components/videocall/VideoCall";
import WhiteBoard from "../components/videocall/WhiteBoard";

const Session = () => {
  const [showWhiteboard, setShowWhiteboard] = useState(true);

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="flex justify-end p-4 bg-white shadow-md z-10">
        <button
          onClick={() => setShowWhiteboard(!showWhiteboard)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showWhiteboard ? "Hide Whiteboard" : "Show Whiteboard"}
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-grow flex flex-col md:flex-row p-4 overflow-hidden">
        {/* Video Call */}
        <div className="flex-1 h-full mb-4 md:mb-0 overflow-auto">
          <VideoCall />
        </div>

        {/* Whiteboard (conditionally rendered) */}
        {showWhiteboard && (
          <div className="flex-1 h-full md:ml-4 overflow-auto">
            <WhiteBoard />
          </div>
        )}
      </div>
    </div>
  );
};

export default Session;
