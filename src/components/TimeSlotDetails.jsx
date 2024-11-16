import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import EditButton from "./tutor/edit timeslot/EditButton";
import CancelTimeSlot from "./tutor/edit timeslot/CancelTimeSlot";
import DeleteButton from "./tutor/edit timeslot/DeleteButton";
import ConfirmationModal from "./tutor/edit timeslot/ConfirmationModal";
import {
  fetchSubjects,
  fetchTimeSlotDetails,
} from "../redux/thunk/timeSlotThunk";
import {
  setOpenConfirmationModalOff,
  setSelectedSubject,
} from "../redux/slices/timeSlotSlice";
import ChatButton from "./ChatButton";

const TimeSlotDetails = () => {
  const dispatch = useDispatch();
  const {
    actionType,
    openConfirmationModal,
    loading,
    event,
    selectedSubject,
    render,
    subjectList = [],
  } = useSelector((state) => state.timeSlot);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTimeSlotDetails(id));
  }, [id, render]);

  useEffect(() => {
    if (event) {
      dispatch(fetchSubjects());
    }
  }, [event]);

  const handleSubjectChange = (event) => {
    dispatch(setSelectedSubject(event.target.value));
  };

  const renderLoadingState = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  );

  const renderErrorState = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  const renderTimeSlotDetails = () => (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Time Slot Details
      </Typography>
      <Stack spacing={2}>
        <DetailRow
          label="Status"
          value={event.title}
          color={event.title === "AVAILABLE" ? "green" : "red"}
        />
        {role === "TUTOR" && event.title !== "CANCELLED" && <EditButton />}
        <DetailRow
          label="Start Time"
          value={dayjs(event.start).format("hh:mm A")}
        />
        <DetailRow
          label="End Time"
          value={dayjs(event.end).format("hh:mm A")}
        />
        <DetailRow label="Tutor" value={event.tutor_name} />

        {(event.title === "BOOKED" || event.title === "CANCELLED") && (
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
              rate={event.rate}
              selectedSubject={selectedSubject}
            />
          </>
        )}
        <ConfirmationModal
          open={openConfirmationModal}
          actionType={actionType}
        />
        {event.title === "BOOKED" && (
          <DetailRow label="Chat" value={<ChatButton
          user_id={role === "TUTOR" ? event.student : event.tutor}
        />} />
        )}

        {event.title === "BOOKED" && <CancelTimeSlot />}
        {event.title === "AVAILABLE" && role === "TUTOR" && <DeleteButton />}

        <GoBackButton />
      </Stack>
    </Paper>
  );

  return (
    <Box className="min-h-screen" sx={{ padding: 2 }}>
      {loading
        ? renderLoadingState()
        : error
        ? renderErrorState()
        : renderTimeSlotDetails()}
    </Box>
  );
};

const DetailRow = ({ label, value, color, bold }) => (
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={4}>
      <Typography fontWeight="bold">{label}:</Typography>
    </Grid>
    <Grid item xs={8}>
      <Typography
        sx={{ fontWeight: bold ? "bold" : "normal", color: color || "inherit" }}
      >
        {value}
      </Typography>
    </Grid>
  </Grid>
);

export default TimeSlotDetails;
