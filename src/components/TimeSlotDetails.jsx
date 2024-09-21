import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosGet } from "../axios";
import { useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import BookSlot from "./student/BookSlot";
import GoBackButton from "./GoBackButton";

const TimeSlotDetails = () => {
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState([]);
  const { id } = useParams();
  const { role, access } = useSelector((state) => state.auth);
  const [event, setEvent] = useState(null);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const getData = async () => {
    try {
      const response = await axiosGet(`timeslots/${id}`, access);
      console.log(response.data);
      setEvent(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch time slot details:", error);
      setLoading(false);
    }
  };

  const getSubject = async () => {
    try {
      if (event && event.tutor) {
        const response = await axiosGet(
          `timeslots/tutor-list/${event.tutor}`,
          access
        );
        setSubjectList(response.data[0].subjects || []);
      }
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      setSubjectList([]);
    }
  };

  useEffect(() => {
    getData();
  }, [render]);

  useEffect(() => {
    if (event) {
      getSubject();
    }
  }, [event]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    console.log("subject", event.target.value);
  };

  return (
    <div className="min-h-screen">
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            boxShadow: 3,
            padding: "20px",
            marginBottom: "20px",
            marginTop: "10px",
            borderRadius: "8px",
            backgroundColor: "#fffff",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Time Slot Details
          </Typography>
          <Stack spacing={2}>
            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold">Status:</Typography>
              <Typography
                sx={{
                  marginLeft: "10px",
                  color: event.title === "AVAILABLE" ? "#00b020" : "red",
                  fontWeight: "bold",
                }}
              >
                {event.title}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold">Start Time:</Typography>
              <Typography sx={{ marginLeft: "10px" }}>
                {dayjs(event.start).format("hh:mm A")}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold">End Time:</Typography>
              <Typography sx={{ marginLeft: "10px" }}>
                {dayjs(event.end).format("hh:mm A")}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography fontWeight="bold">Tutor:</Typography>
              <Typography sx={{ marginLeft: "10px" }}>{event.tutor_name}</Typography>
            </Box>

            {event.title === "BOOKED" && (
              <>
                <Box display="flex" alignItems="center">
                  <Typography fontWeight="bold">Booked By:</Typography>
                  <Typography sx={{ marginLeft: "10px" }}>{event.student_name}</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <Typography fontWeight="bold">Subject:</Typography>
                  <Typography sx={{ marginLeft: "10px" }}>{event.subject_name}</Typography>
                </Box>
              </>
            )}

            {role === "STUDENT" && (
              <Box display="flex" alignItems="center">
                <Typography fontWeight="bold">Rate:</Typography>
                <Typography sx={{ marginLeft: "10px", fontWeight: "bold" }}>
                  {event.rate}
                </Typography>
              </Box>
            )}

            {role === "STUDENT" && event.title === "AVAILABLE" && (
              <>
                {subjectList.length > 0 ? (
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Select Subject</InputLabel>
                    <Select
                      value={selectedSubject}
                      label="Select Subject"
                      onChange={handleSubjectChange}
                    >
                      {subjectList.map((subject) => (
                        <MenuItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <CircularProgress />
                )}
                <BookSlot
                  slot_id={event.id}
                  setRender={setRender}
                  rate={event.rate}
                  selectedSubject={selectedSubject}
                />
              </>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <GoBackButton />
            </Box>
          </Stack>
        </Box>
      )}
    </div>
  );
};

export default TimeSlotDetails;
