import React from 'react'
import loginImg from "../assets/E-learning3.jpg";
import { Outlet } from 'react-router-dom';


const GuestLayout = () => {
  return (
    <div className='relative w-full h-screen bg-zinc-900/90'>
        <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginImg}
        alt="/"
      />
      <Outlet />
    </div>
  )
}

export default GuestLayout