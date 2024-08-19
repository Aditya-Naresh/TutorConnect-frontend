import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useMediaQuery } from "@mui/material";

export default function MyStaticDatePicker({ today, setSelectedDate, setShowTimeForm }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleChange = (newDate) => {
    setSelectedDate(newDate);
    console.log("setselected date",newDate);
    
  };

  const handleAccept = () => {
    setShowTimeForm(true)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation={isSmallScreen ? "portrait" : "landscape"}
        minDate={today}
        onChange={handleChange}
        onAccept={handleAccept}
      />
    </LocalizationProvider>
  );
}
