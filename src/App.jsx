import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GuestLayout from "./HigherOrderComponents/GuestLayout";
import EmailVerification from "./pages/EmailVerification";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from './redux/store.jsx'
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const App = () => {
  let persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <ToastContainer />
            <GuestLayout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/verify-email/:uid/:token"
                  element={<EmailVerification />}
                />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path='/reset-password/:uid/:token' element={<ResetPassword />} />
              </Routes>
            </GuestLayout>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
