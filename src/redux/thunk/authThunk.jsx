import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../../server";

export const signup = createAsyncThunk(
    'auth/signup',
    async (signupData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${SERVER}/accounts/signup/`, signupData)
            return response.data
        } catch (error) {
            
            if (error.response && error.response.data.email[0]) {
                return rejectWithValue(error.response.data.email[0])
            }
            return rejectWithValue('Signup failed. Please try again')
        }
    }
)