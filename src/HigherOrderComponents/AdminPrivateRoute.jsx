import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminPrivateRoute = () => {
    const role = useSelector((state) => state.auth.role)
  return role === "ADMIN" ? <Outlet /> : <Navigate to='/' />
}

export default AdminPrivateRoute