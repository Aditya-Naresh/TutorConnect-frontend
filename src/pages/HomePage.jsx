import React from 'react'
import { Link } from 'react-router-dom'
import { ReactTyped } from 'react-typed'
import logo from "../assets/logo.png"

const HomePage = () => {
  return (
    <div className="text-white bg-[#000300]">
      <div className='w-full flex justify-center'>
        <img src={logo} alt="logo" className='h-[100px] md:h-[300px]' />

      </div>
    <div className="max-w-[800px] mt-[-100] w-full h-screen mx-auto text-center flex flex-col justify-center">
      <p className="text-[#00df9a] font-bold p-2">
        Need help Studying hard topics?
      </p>
      <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
        Connect with a Tutor
      </h1>
      <div className="flex justify-center items-center">
        <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
          Prepare for
        </p>
        <ReactTyped
          className="pl-2 md:text-5xl sm:text-4xl text-xl font-bold"
          strings={["School exams", "PSC", "UPSC", "Competitive Exams"]}
          typeSpeed={120}
          backSpeed={140}
          loop
        />
      </div>
      <p className="md:text-2xl text-xl font-bold text-gray-500 md:pl-4 pd-2">
        Connenct with experts from various fields who could guide you.
      </p>
      <Link to={'/signup'}>
      <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">Get Started</button>
      </Link>
    </div>
  </div>
  )
}

export default HomePage