import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken } from '../../redux/slices/authSlice';
import { StudentNavBar, TutorNavBar, AdminNavBar } from './NavBarVariants';

const NavBar = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

  if (role === "STUDENT") {
    return <StudentNavBar />;
  } else if (role === "TUTOR") {
    return <TutorNavBar />;
  } else {
    return <AdminNavBar />;
  }
};

export default NavBar;