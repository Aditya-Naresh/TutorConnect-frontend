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
import store from "./redux/store.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserLayout from "./HigherOrderComponents/UserLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import PrivateRoute from "./HigherOrderComponents/PrivateRoute.jsx";
import AdminPrivateRoute from "./HigherOrderComponents/AdminPrivateRoute.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";
import Profile from "./pages/Profile.jsx";
import ApproveTutor from "./pages/admin/ApproveTutor.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tutorlist from "./pages/student/Tutorlist.jsx";
import Wallet from "./pages/Wallet.jsx";
import BookTimeSlots from "./pages/student/BookTimeSlots.jsx";

import "./app.css";
import CreateTimeSlots from "./pages/tutor/CreateTimeSlots.jsx";
import TimeSlotDetailsPage from "./pages/TimeSlotDetailsPage.jsx";
import SocialAuthUserAccount from "./pages/SocialAuthUserAccount.jsx";
import Chat from "./pages/Chat.jsx";
import CancellationPage from "./pages/admin/CancellationPage.jsx";
import Session from "./pages/Session.jsx";
import SessionHistory from "./pages/SessionHistory.jsx";

const App = () => {
  let persistor = persistStore(store);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <ToastContainer />
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route element={<GuestLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/verify-email/:uid/:token"
                  element={<EmailVerification />}
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:uid/:token"
                  element={<ResetPassword />}
                />
                <Route path="/account" element={<SocialAuthUserAccount />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route element={<UserLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/timeslots" element={<CreateTimeSlots />} />
                  <Route path="/tutorlist" element={<Tutorlist />} />
                  <Route
                    path="/book-slots/:tutor_id"
                    element={<BookTimeSlots />}
                  />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route
                    path="/timeslot-details/:id"
                    element={<TimeSlotDetailsPage />}
                  />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/chat/:roomName" element={<Chat />} />
                  <Route path="/session/:timeSlotId" element={<Session />} />
                  <Route path="/session-history" element={<SessionHistory/>} />
                </Route>
              </Route>

              <Route element={<AdminPrivateRoute />}>
                <Route element={<UserLayout />}>
                  <Route
                    path="/user-management/:role"
                    element={<UserManagement />}
                  />
                  <Route path="/approve-tutor" element={<ApproveTutor />} />
                  <Route path="/cancellations" element={<CancellationPage />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
