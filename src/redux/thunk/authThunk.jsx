import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
    'auth/signup',
    async (signupData, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/accounts/signup/", signupData)
            return response.data
        } catch (error) {
            
            if (error.response && error.response.data.email[0]) {
                return rejectWithValue(error.response.data.email[0])
            }
            return rejectWithValue('Signup failed. Please try again')
        }
    }
)