import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GuestLayout from "./HigherOrderComponents/GuestLayout";
import EmailVerification from "./pages/EmailVerification";

const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <GuestLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email/:uid/:token" element={<EmailVerification/>} />
          </Routes>
        </GuestLayout>
      </Router>
    </>
  );
};

export default App;
