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
              </Route>

              <Route element={<PrivateRoute />}>
                <Route element={<UserLayout />}>
                  <Route path="/" element={<Dashboard />} />
                </Route>
              </Route>

              <Route element={<AdminPrivateRoute />}>
                <Route element={<UserLayout />}>
                  <Route
                    path="/user-management/:role"
                    element={<UserManagement />}
                  />
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
