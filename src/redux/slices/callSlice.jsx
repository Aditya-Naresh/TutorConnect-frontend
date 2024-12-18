import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "./authSlice";
const initialState = {
    call: false,
    callWith: null,
    isCalling: false,
    isInCall: false,
    incomingCall: null,
    caller: null,
    caller_name:null,
    receiver: null,
    receiver_name:null,
    callEnded: false,
    isLoading: false,
    error: null,
    callAccepted: null,
    callDeclined: null,
    callerImage: null,
    ws: null,
    isCallingProfile: null,
  }
const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    startCall: (state, action) => {
      state.isCalling = true;
      state.caller = action.payload.caller;
      state.caller_name =action.payload.caller_name
      state.receiver = action.payload.receiver;
      state.receiver_name = action.payload.receiver_name
      state.call = true;
      state.callWith = action.payload.receiver;
      state.isCallingProfile = action.payload.callerProfile;
    },
    receiveCallRequest: (state, action) => {
      state.incomingCall = action.payload;
      state.call = true;
      state.callWith = action.payload.from;
      state.callerImage = action.payload.callerImage;
      state.caller = action.payload.from;
      state.caller_name = action.payload.from_name
      state.receiver = action.payload.receiver
      state.receiver_name = action.payload.receiver_name
    },
    acceptCall: (state) => {
      state.isInCall = true;
      state.callAccepted = true;
      state.isCalling = false;
      state.incomingCall = null;
    },
    declineCall: (state) => {
      state.callEnded = true;
      state.isInCall = false;
      state.callAccepted = false;
      state.callDeclined = true;
      state.call = false;
      state.callWith = null;
      state.caller = null;
      state.receiver = null;
      state.incomingCall = null;
      state.isCalling = false;
      state.callerImage = null;
    },

    endCall: (state) => {
      state.callEnded = true;
      state.isInCall = false;
      state.callAccepted = false;
      state.callDeclined = false;
      state.call = false;
      state.callWith = null;
      state.caller = null;
      state.caller_name = null
      state.receiver = null;
      state.receiver_name=null
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setWebSocket: (state, action) => {
      state.ws = action.payload;
    },
    closeWebSocket: (state) => {
      if (state.ws) {
        state.ws.close();
        state.ws = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      return initialState;
    });
  },
});

export const {
  startCall,
  receiveCallRequest,
  acceptCall,
  declineCall,
  endCall,
  setLoading,
  setError,
  setWebSocket,
  closeWebSocket,
} = callSlice.actions;

export default callSlice.reducer;
