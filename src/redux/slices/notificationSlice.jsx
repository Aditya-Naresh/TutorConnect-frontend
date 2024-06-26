import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "./authSlice";

const initialState = {
    enabled: false
}
const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers:{
        toggleNotification: (state, action) =>{
            state.enabled = !state.enabled
        }
    },
    extraReducers:(builder) => {
        builder.addCase(logOut, (state) => {
            return initialState
        })
    }
})

export const {toggleNotification} = notificationSlice.actions

export default notificationSlice.reducer