import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const role = useSelector((state) => state.auth.role)
  return (
    <div className='text-red-500'>Dashboard {role}</div>
  )
}

export default Dashboard