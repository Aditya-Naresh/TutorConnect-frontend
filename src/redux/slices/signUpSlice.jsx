import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTutor : false,
    email : "",
    first_name : "",
    last_name : "",
    password : "",
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
          updateCertification: (state, action) => {
            const { index, title, image } = action.payload;
            state.certifications[index] = { title, image }; 
          },
          addSubject: (state, action) => {
            state.subjects.push(action.payload); 
          },
          removeSubject: (state, action) => {
            state.subjects.splice(action.payload.index, 1); 
          },
          updateSubject: (state, action) => {
            const { index, subject } = action.payload;
            state.subjects[index] = subject; 
          },
        updateRate: (state, action) => {
            state.rate = action.payload
        },
        resetForm: () => initialState
    }
})

export const {updateField, addCertification, removeCertification, updateCertification, updateSubject, updateRate, resetForm} = signUpSlice.actions

export default signUpSlice.reducer