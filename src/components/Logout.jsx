import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logOut())
        toast("User Logged Out")
        navigate('/login')
    }
  return (
    <span className='cursor-pointer text-white font-bold' onClick={handleLogout}>Logout</span>
  )
}

export default Logout