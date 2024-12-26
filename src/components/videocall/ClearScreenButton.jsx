import React from "react";
import { Trash2 } from "lucide-react";
import Button from "@mui/material/Button";
import "./styles.css";

const ClearScreenButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={onClick}
      className="clear-button bg-red-500 hover:bg-red-700 text-white font-bold w-12 h-12 rounded-full shadow-lg flex justify-center items-center transition-all duration-300"
    >
      <Trash2 className="w-5 h-5 mr-2" />
    </Button>
  );
};

export default ClearScreenButton;
