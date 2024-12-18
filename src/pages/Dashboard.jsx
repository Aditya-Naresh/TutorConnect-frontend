import React from 'react'
import { useSelector } from 'react-redux'
import Calendar from '../components/Calendar'
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard'

const Dashboard = () => {
    const{ role }= useSelector((state) => state.auth)
    const wallet = useSelector((state) => state.wallet.id)
  return (
    <div className='w-full h-auto overflow-auto'>
      <div className='flex justify-center items-center'>
          <h1 className='m-4 font-bold text-2xl lg:text-5xl '>{role === "ADMIN" ? "Site Analytics" : <>{role === "TUTOR" ? "Time Slots" : "Booked Sessions"}</>}</h1>
      </div>
      {role === "ADMIN" ? <AnalyticsDashboard/> : <Calendar />}
    </div>
  )
}

export default Dashboard