import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { WEBSOCKETSERVER } from "../../server";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const WhiteBoard = () => {
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("black");
  const { timeSlotId } = useParams();
  const { access } = useSelector((state) => state.auth);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Resize canvas to fit the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      context.scale(devicePixelRatio, devicePixelRatio);
    };

    // Initialize canvas size
    resizeCanvas();

    // Set up event listeners
    window.addEventListener("resize", resizeCanvas);

    // Set up WebSocket connection
    socketRef.current = new WebSocket(
      `${WEBSOCKETSERVER}/whiteboard/${timeSlotId}/?token=${access}`
    );

    socketRef.current.onopen = (e) => {
      console.log("WebSocket connected:", e);
    };

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      drawRemote(data.x0, data.y0, data.x1, data.y1, data.color);
    };

    socketRef.current.onerror = (e) => {
      console.log("WebSocket error:", e);
    };

    return () => {
      // Cleanup event listeners and WebSocket connection on component unmount
      window.removeEventListener("resize", resizeCanvas);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let drawing = false;
    let lastX, lastY;

    const startDrawing = (e) => {
      drawing = true;
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
    };

    const draw = (e) => {
      if (!drawing) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      drawLocal(lastX, lastY, x, y, currentColor);
      sendDrawingData(lastX, lastY, x, y);

      lastX = x;
      lastY = y;
    };

    const stopDrawing = () => {
      drawing = false;
    };

    // Add event listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      // Remove event listeners during cleanup
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, [currentColor]);

  const drawLocal = (x0, y0, x1, y1, color) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.lineCap = "round";
    context.stroke();
  };

  const drawRemote = (x0, y0, x1, y1, color) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.beginPath();
    context.moveTo(x0 * canvas.width, y0 * canvas.height);
    context.lineTo(x1 * canvas.width, y1 * canvas.height);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.lineCap = "round";
    context.stroke();
  };

  const sendDrawingData = (x0, y0, x1, y1) => {
    if (!socketRef.current) return;

    socketRef.current.send(
      JSON.stringify({
        x0: x0 / canvasRef.current.width,
        y0: y0 / canvasRef.current.height,
        x1: x1 / canvasRef.current.width,
        y1: y1 / canvasRef.current.height,
        color: currentColor,
      })
    );
  };

  const handleColorChange = (color) => {
    setCurrentColor(color);
  };

  return (
    <div>
      <canvas ref={canvasRef} className="whiteboard"></canvas>
      <div className="colors">
        {["black", "red", "green", "blue", "yellow"].map((color) => (
          <div
            key={color}
            className={`color ${color}`}
            onClick={() => handleColorChange(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default WhiteBoard;