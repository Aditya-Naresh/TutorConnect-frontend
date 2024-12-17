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
import { setSelectedSubject } from "../redux/slices/timeSlotSlice";
import ChatButton from "./ChatButton";
import TimeSlotStatusBadge from "./tutor/TimeSlotStatusBadge";
import VideoButton from "./videocall/VideoButton";
import { WEBSOCKETSERVER } from "../server";

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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6">
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Time Slot Details
        </Typography>
        <div className="mt-2">
          <TimeSlotStatusBadge title={event.title} />
        </div>
      </div>
      <Stack spacing={2}>
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
          <DetailRow
            label="Rate"
            value={`₹${
              event.title === "AVAILABLE" ? event.tutor_rate : event.rate
            }`}
            bold
          />
        )}

        {role === "STUDENT" && event.title === "AVAILABLE" && (
          <>
            <DetailRow
              label="Select Subject"
              value={
                subjectList.length > 0 ? (
                  <FormControl className="w-48">
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
                )
              }
            />
            <DetailRow
              label="Book This Slot"
              value={
                <BookSlot
                  slot_id={event.id}
                  rate={event.tutor_rate}
                  selectedSubject={selectedSubject}
                />
              }
            />
          </>
        )}
        <ConfirmationModal
          open={openConfirmationModal}
          actionType={actionType}
        />
        {event.title === "BOOKED" && (
          <DetailRow
            label="Chat"
            value={
              <ChatButton
                user_id={role === "TUTOR" ? event.student : event.tutor}
                role={role}
              />
            }
          />
        )}

        {event.title === "BOOKED" && (
          <>
            <DetailRow label="Cancellation" value={<CancelTimeSlot />} />
            <DetailRow
              label="Join Session"
              value={
                <VideoButton
                  target_user={role === "TUTOR" ? event.student : event.tutor}
                  timeSlot={event.id}
                />
              }
            />
          </>
        )}
        {event.title === "AVAILABLE" && role === "TUTOR" && (
          <DetailRow label="Delete Timeslot" value={<DeleteButton />} />
        )}

        <GoBackButton />
      </Stack>
    </div>
  );

  return (
    <Box className="container mx-auto px-4 py-8" sx={{ padding: 2 }}>
      {loading
        ? renderLoadingState()
        : error
        ? renderErrorState()
        : renderTimeSlotDetails()}
    </Box>
  );
};

const DetailRow = ({ label, value, color, bold }) => (
  <Grid container spacing={1} alignContent="center">
    <Grid item xs={4} textAlign="center">
      <Typography fontWeight="bold">{label}:</Typography>
    </Grid>
    <Grid item xs={8} textAlign="center">
      <Typography
        sx={{ fontWeight: bold ? "bold" : "normal", color: color || "inherit" }}
      >
        {value}
      </Typography>
    </Grid>
  </Grid>
);

export default TimeSlotDetails;
