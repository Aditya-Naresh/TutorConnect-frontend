import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_tutor : false,
    email : "",
    first_name : "",
    last_name : "",
    password : "",
    confirm_password:"",
    certifications : [],
    subjects : [],
    rate : ""
}
const signUpSlice = createSlice({
    name: "signup",
    initialState : initialState,
    reducers : {
        updateField: (state, action) => {
            const {field , value} = action.payload
            state[field] = value
        },
        addCertification: (state, action) => {
            state.certifications.push(action.payload); 
          },
          removeCertification: (state, action) => {
            state.certifications.splice(action.payload.index, 1); 
          },
          addSubject: (state, action) => {
            state.subjects.push(action.payload); 
          },
          removeSubject: (state, action) => {
            state.subjects.splice(action.payload.index, 1); 
          },
        resetForm: () => initialState
    }
})

export const {updateField, addCertification, removeCertification, updateCertification, addSubject, removeSubject, updateRate, resetForm} = signUpSlice.actions

export default signUpSlice.reducer