import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import storage from "redux-persist/lib/storage";
import notificationReducer from './slices/notificationSlice'
import profileReducer from './slices/profileSlice'
import walletReducer from './slices/walletSlice'
import signUpReducer from './slices/signUpSlice'
import timeSlotReducer from'./slices/timeSlotSlice'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  timeSlot: timeSlotReducer,
  auth: authReducer,
  notifications: notificationReducer,
  profile: profileReducer,
  wallet: walletReducer,
  signup: signUpReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export default store;