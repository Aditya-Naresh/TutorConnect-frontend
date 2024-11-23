        import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDelete, axiosGet, axiosPatch } from "../../axios";
import {
  resetSlot,
  setEvent,
  setRender,
  setSubjectList,
  setTimeSLotDetails,
} from "../slices/timeSlotSlice";
import { toast } from "react-toastify";

export const fetchTimeSlotDetails = createAsyncThunk(
  "timeslot/fetchDetails",
  async (id, { getState, rejectWithValue, dispatch }) => {
    dispatch(resetSlot());
    try {
      const access = getState().auth.access;
      const response = await axiosGet(`timeslots/${id}`, access);
      if (response.status === 200) {
        dispatch(setEvent(response.data));
        console.log("TimeSLot details:",response.data);
        
        dispatch(setTimeSLotDetails({ field: "loading", value: false }));
      } else {
        dispatch(resetSlot());
      }
      return response.data;
    } catch (error) {
      console.error("Failed to fetch time slot details:", error);
      return rejectWithValue("Failed to load time slot details");
    }
  }
);

export const fetchSubjects = createAsyncThunk(
  "timeslot/fetchSubject",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const access = getState().auth.access;
      const event = getState().timeSlot.event;
      const response = await axiosGet(
        `timeslots/tutor-list/${event.tutor}`,
        access
      );
      console.log("subjects", response.data[0]?.subjects);
      dispatch(setSubjectList(response.data[0]?.subjects || []));
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      return rejectWithValue("Failed to load Subjects");
    }
  }
);

export const updateTimeSlot = createAsyncThunk(
  "timeslot/updateTimeSlot",
  async ({ id, data, actionType }, { getState, rejectWithValue, dispatch }) => {
    try {
      const access = getState().auth.access;
      const response = await axiosPatch(`timeslots/${id}`, data, access);
      console.log("thunk:", response);

      if (response.status === 200) {
        dispatch(setRender(response.data));
        if (actionType === "editTime") {
          toast.info("Time updated");
        } else if (actionType === "cancel") {
          toast.warning("Canceled the time slot booking");
        }
      }
      return response.data;
    } catch (error) {
      console.error("Failed to update Time Slot:", error);
      return rejectWithValue("Failed to update Time Slot");
    }
  }
);

export const deleteTimeSlot = createAsyncThunk(
  "timeslot/deleteTimeSlot",
  async (id, { getState, rejectWithValue, dispatch }) => {
    try {
      const access = getState().auth.access;
      const response = await axiosDelete(`timeslots/${id}`, access);
      return response
    } catch (error) {
      console.log("Deletion failed :", error);
      return rejectWithValue("Failed to delete the Time Slot");
    }
  }
);
