import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: "",
  full_name: "",
  role: "",
  access: "",
  refresh: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        const { email, full_name, role, access_token, refresh_token } = action.payload;
        return {
          ...state,
          email,
          full_name,
          role,
          access: access_token,
          refresh: refresh_token,
        };
      },
      logOut: (state) => {
        return {
          ...initialState,
        };
      },
      refreshAuthToken: (state, action) => {
        state.access = action.payload.access;
      },
    },
  });
  
  export const refreshAccessToken = () => async (dispatch, getState) => {
    const refreshToken = getState().auth.refresh;
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/token/refresh/",
        { refresh: refreshToken }
      );
  
      dispatch(refreshAuthToken(response.data));
      return response.data.access_token;
    } catch (error) {
      console.error("Token refresh failed:", error);
      dispatch(logOut());
    } finally {
      setTimeout(() => {
        dispatch(refreshAccessToken());
      }, 4 * 60 * 1000); 
    }
  };
  

export const { loginSuccess, logOut, refreshAuthToken } = authSlice.actions;

export default authSlice.reducer;
