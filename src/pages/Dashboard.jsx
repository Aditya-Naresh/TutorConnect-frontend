import React from 'react'
import { useSelector } from 'react-redux'
import Calendar from '../components/Calendar'

const Dashboard = () => {
    const role = useSelector((state) => state.auth.role)
  return (
    <div className='w-full h-[600px] overflow-auto'>
      <Calendar />
    </div>
  )
}

export default Dashboard