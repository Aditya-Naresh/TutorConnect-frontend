import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import notificationReducer from "./slices/notificationSlice";
import profileReducer from "./slices/profileSlice";
import walletReducer from "./slices/walletSlice";
import signUpReducer from "./slices/signUpSlice";
import timeSlotReducer from "./slices/timeSlotSlice";
import chatReducer from "./slices/chatSlice";
import callReducer from "./slices/callSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["call.ws"],
};

const reducer = combineReducers({
  timeSlot: timeSlotReducer,
  auth: authReducer,
  notifications: notificationReducer,
  profile: profileReducer,
  wallet: walletReducer,
  signup: signUpReducer,
  chat: chatReducer,
  call: callReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "call/setWebSocket",
        ],
        ignoredPaths: ["call.ws"],
      },
    }),
});

let persistor = persistStore(store);

export default store;
