import { createSlice } from "@reduxjs/toolkit";

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
    },
  });
  

export const { loginSuccess, logOut } = authSlice.actions;

export default authSlice.reducer;
