import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "./authSlice";

const initialState = {
    enabled: false
}
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        toggleMenu: (state, action) =>{
            state.enabled = !state.enabled
        }
    },
    extraReducers:(builder) => {
        builder.addCase(logOut, (state) => {
            return initialState
        })
    }
})

export const {toggleMenu} = profileSlice.actions

export default profileSlice.reducer