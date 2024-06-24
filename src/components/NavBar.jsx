import React, { useEffect } from 'react'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import Logout from './Logout'
import { Link } from 'react-router-dom'
import { refreshAccessToken } from '../redux/slices/authSlice'


const StudentNavBar = () => {
  return (
    <div className="bg-gradient-to-tr from-black via-emerald-700 to-green-500 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-8 h-full">
      <Logo/>
      <Logout />
    </div>
  )

}



const TutorNavBar = () => {
  return(
    <div className="bg-gradient-to-tr from-black via-indigo-900 to-blue-700 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between p-8 h-full">
      <Logo/>
      <Logout />
    </div>
  )
}


const AdminNavBar = () => {
  return(
    <div className="bg-gradient-to-tr from-black via-red-900 to-rose-800  z-[20] mx-auto flex w-full items-center justify-between p-8 h-full">
      <Link to={'/'}>
      <Logo/>
      </Link>
      <Logout />
    </div>
  )
}

const NavBar = () => {
  const role = useSelector((state)=>state.auth.role)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(refreshAccessToken())
  }, [dispatch])
  if(role === "STUDENT"){
    return <StudentNavBar />
  }else if(role === "TUTOR"){
    return <TutorNavBar />
  }else{
    return <AdminNavBar />
  }
}

export default NavBar