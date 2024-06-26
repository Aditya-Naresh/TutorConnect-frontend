import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import storage from "redux-persist/lib/storage";
import notificationReducer from './slices/notificationSlice'
import profileReducer from './slices/profileSlice'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
  profile: profileReducer,
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