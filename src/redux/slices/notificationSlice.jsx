import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "./authSlice";

const initialState = {
    enabled: false,
    count : 0
}
const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers:{
        toggleNotification: (state, action) =>{
            state.enabled = !state.enabled
        },
        setNotificationCount: (state, action) => {
            state.count = action.payload
        },
        closeNotification:(state) => {
            state.enabled = false
        }
    },
    extraReducers:(builder) => {
        builder.addCase(logOut, (state) => {
            state.enabled = false
            state.count = 0
        })
    }
})

export const {toggleNotification, setNotificationCount, closeNotification} = notificationSlice.actions

export default notificationSlice.reducer