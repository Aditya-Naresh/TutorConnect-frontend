import { createSlice } from "@reduxjs/toolkit";

const timeSlotSlice = createSlice({
    name:"timeSlot",
    initialState: {
        loading: true,
        event: null,
        subjectList: [],
        selectedSubject: "",
        error: null,
        render : "",
        openConfirmationModal: false,
        actionType: "",
        editSlotModal: false
    },
    reducers: {
        setTimeSLotDetails: (state,action) => {
            const {field, value} = action.payload
            state[field] = value
        },
        setEvent: (state, action) => {
            state.event = action.payload
        },
        setSubjectList: (state, action) => {
            state.subjectList = action.payload
        },
        setSelectedSubject: (state, action) => {
            state.selectedSubject = action.payload
        },
        setRender: (state, action) => {
            state.render = action.payload
        },
        setEditSlotModalOn: (state) => {
            state.editSlotModal = true 
        },
        setEditSlotModalOff: (state) => {
            state.editSlotModal = false 
        },
        setActionType: (state, action) => {
            state.actionType = action.payload
        },
        setOpenConfirmationModalOn: (state) => {
            state.openConfirmationModal = true
        },
        setOpenConfirmationModalOff: (state) => {
            state.openConfirmationModal = false
        },
        resetSlot: (state) => {
            state.loading = true,
            state.event = null,
            state.subjectList = [],
            state.selectedSubject = "",
            state.error = null,
            state.render = "",
            state.openConfirmationModal = false,
            state.actionType = "",
            state.editSlotModal = false
        },
    }
})

export const {setActionType,
     setTimeSLotDetails, resetSlot, 
     setEvent, setSubjectList, 
     setSelectedSubject, setRender, 
     setEditSlotModalOn, setEditSlotModalOff,
     setOpenConfirmationModalOn, setOpenConfirmationModalOff
    } = timeSlotSlice.actions

export default timeSlotSlice.reducer