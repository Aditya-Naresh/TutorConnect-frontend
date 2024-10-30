import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { access, role } = useSelector((state) => state.auth);

  if (!access) {
    return <Navigate to='/home' />;
  }

  if (role === 'NEW') {
    return <Navigate to='/account' />;
  }

  return <Outlet />;
};

export default PrivateRoute;
