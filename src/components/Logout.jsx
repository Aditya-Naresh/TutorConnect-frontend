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
    <span className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ' onClick={handleLogout}>Logout</span>
  )
}

export default Logout