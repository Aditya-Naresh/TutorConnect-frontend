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
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import dayjs from "dayjs";
import BookSlot from "./student/BookSlot";
import GoBackButton from "./GoBackButton";

const TimeSlotDetails = () => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [error, setError] = useState(null);
  const [render, setRender] = useState("")
  const { id } = useParams();
  const { role, access } = useSelector((state) => state.auth);

  const fetchTimeSlotData = async () => {
    setLoading(true);
    try {
      const response = await axiosGet(`timeslots/${id}`, access);
      setEvent(response.data);
    } catch (err) {
      console.error("Failed to fetch time slot details:", err);
      setError("Failed to load time slot details");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    if (!event?.tutor) return;
    try {
      const response = await axiosGet(`timeslots/tutor-list/${event.tutor}`, access);
      setSubjectList(response.data[0]?.subjects || []);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      setSubjectList([]);
    }
  };

  useEffect(() => {
    fetchTimeSlotData();
  }, [render]);

  useEffect(() => {
    if (event) fetchSubjects();
  }, [event]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const renderLoadingState = () => (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  const renderErrorState = () => (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  const renderTimeSlotDetails = () => (
    <Paper elevation={3} sx={{ padding: "20px", borderRadius: "8px", maxWidth: "600px", mx: "auto", mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Time Slot Details
      </Typography>
      <Stack spacing={2}>
        <DetailRow label="Status" value={event.title} color={event.title === "AVAILABLE" ? "green" : "red"} />
        <DetailRow label="Start Time" value={dayjs(event.start).format("hh:mm A")} />
        <DetailRow label="End Time" value={dayjs(event.end).format("hh:mm A")} />
        <DetailRow label="Tutor" value={event.tutor_name} />

        {event.title === "BOOKED" && (
          <>
            <DetailRow label="Booked By" value={event.student_name} />
            <DetailRow label="Subject" value={event.subject_name} />
          </>
        )}

        {role === "STUDENT" && (
          <DetailRow label="Rate" value={`₹${event.rate}`} bold />
        )}

        {role === "STUDENT" && event.title === "AVAILABLE" && (
          <>
            {subjectList.length > 0 ? (
              <FormControl fullWidth>
                <InputLabel>Select Subject</InputLabel>
                <Select value={selectedSubject} label="Select Subject" onChange={handleSubjectChange}>
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
              rate={event.rate}
              selectedSubject={selectedSubject}
              setRender={setRender}
            />
          </>
        )}

        <GoBackButton />
      </Stack>
    </Paper>
  );

  return (
    <Box className="min-h-screen" sx={{ padding: 2 }}>
      {loading ? renderLoadingState() : error ? renderErrorState() : renderTimeSlotDetails()}
    </Box>
  );
};

const DetailRow = ({ label, value, color, bold }) => (
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={4}>
      <Typography fontWeight="bold">{label}:</Typography>
    </Grid>
    <Grid item xs={8}>
      <Typography sx={{ fontWeight: bold ? "bold" : "normal", color: color || "inherit" }}>{value}</Typography>
    </Grid>
  </Grid>
);

export default TimeSlotDetails;
