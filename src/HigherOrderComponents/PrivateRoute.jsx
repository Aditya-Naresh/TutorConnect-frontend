import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const access = useSelector((state) => state.auth.access)
  return access? <Outlet /> : <Navigate to='/home' />
}

export default PrivateRoute