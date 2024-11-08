import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosGet } from "../../axios";
import { updateCount, updateContacts } from "../slices/chatSlice";
export const fetchContactListData = createAsyncThunk(
  "chat/chat_users",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { access } = getState().auth;
    try {
      const response = await axiosGet("chat/chat_users/", access);
      if (response.status === 200) {
        const contactsData = response.data;
        const unreadCount = contactsData.filter(
          (contact) => contact.unseen_count > 0
        ).length;
        dispatch(updateCount(unreadCount))
        dispatch(updateContacts(contactsData))
        return {contactsData, unreadCount}
      }
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occured.");
    }
  }
);
