import React from 'react'
import { useSelector } from 'react-redux'
import Calendar from '../components/Calendar'

const Dashboard = () => {
    const{ role }= useSelector((state) => state.auth)
    const wallet = useSelector((state) => state.wallet.id)
  return (
    <div className='w-full h-[600px] overflow-auto'>
      <div className='flex justify-center items-center'>
          <h1 className='font-bold text-3xl lg:text-5xl '>{role === "ADMIN" ? "Site Analytics" : "Sessions"}</h1>
      </div>
      {role === "ADMIN" ? <p>Site Analytics after completing everything</p> : <Calendar />}
    </div>
  )
}

export default Dashboard