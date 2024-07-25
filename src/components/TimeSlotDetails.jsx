import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosGet } from "../axios";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import BookSlot from "./student/BookSlot";
import MySelectForm from "./forms/createform/MySelectForm";

const TimeSlotDetails = () => {
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState([]);
  const { id } = useParams();
  const { role, access } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.wallet.balance);
  const [event, setEvent] = useState();
  const getData = async () => {
    const response = await axiosGet(`timeslots/${id}`, access);
    setEvent(response.data);
    console.log(response);
    setLoading(false);
  };

  const getSubject = async () => {
    const response = await axiosGet(``)
  }
  useEffect(() => {
    getData();
  }, [render]);
  return (
    <div>
      {loading ? (
        <p>Loading the data</p>
      ) : (
        <>
          <Box
            sx={{
              boxShadow: 3,
              padding: "20px",
              marginBottom: "20px",
              marginTop: "10px",
              borderRadius: "8px",
              backgroundColor: "#99def7",
              width: "100%",
              maxWidth: "400px",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontWeight: "bold" }}>Status:</Box>
              <Box
                sx={{
                  marginLeft: "10px",
                  color: event.title === "AVAILABLE" ? "#00b020" : "red",
                  fontWeight: "bold",
                }}
              >
                {event.title}
              </Box>
            </Box>
            <Box
              sx={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontWeight: "bold" }}>Start Time:</Box>
              <Box sx={{ marginLeft: "10px" }}>
                {dayjs(event.start).format("hh:mm A")}
              </Box>
            </Box>
            <Box
              sx={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontWeight: "bold" }}>End Time:</Box>
              <Box sx={{ marginLeft: "10px" }}>
                {dayjs(event.end).format("hh:mm A")}
              </Box>
            </Box>
            <Box
              sx={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontWeight: "bold" }}>Tutor:</Box>
              <Box sx={{ marginLeft: "10px" }}>{event.tutor_name}</Box>
            </Box>
            {event.title === "BOOKED" && (
              <>
                <Box
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>Booked By:</Box>
                  <Box sx={{ marginLeft: "10px" }}>{event.student_name}</Box>
                </Box>
                <Box
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>Subject:</Box>
                  <Box sx={{ marginLeft: "10px" }}>{event.subject}</Box>
                </Box>
              </>
            )}
            {role === "STUDENT" && (
              <>
                <Box
                  sx={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>Rate:</Box>
                  <Box
                    sx={{
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {event.rate}
                  </Box>
                </Box>
              </>
            )}
          </Box>
          {role === "STUDENT" && event.title === "AVAILABLE" && (
            <BookSlot
              slot_id={event.id}
              setRender={setRender}
              rate={event.rate}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TimeSlotDetails;
