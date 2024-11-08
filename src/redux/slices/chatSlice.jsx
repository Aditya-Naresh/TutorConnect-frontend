import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "./authSlice";

const initialState = {
    unreadContactsCount: false,
    contacts : [],
}
const chatSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers:{
        updateCount: (state, action) =>{
            state.unreadContactsCount = action.payload
        },
        updateContacts: (state, action) => {
            state.contacts = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(logOut, (state) => {
            return initialState
        })
    }
})

export const {updateCount, updateContacts} = chatSlice.actions

export default chatSlice.reducer