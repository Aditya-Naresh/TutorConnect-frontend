import React from 'react'
import loginImg from "../assets/E-learning3.jpg";


const GuestLayout = (props) => {
  return (
    <div className='relative w-full h-screen db-zinc-900/90'>
        <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={loginImg}
        alt="/"
      />
      {props.children}
    </div>
  )
}

export default GuestLayout