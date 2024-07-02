import React, { useState } from 'react'
import logo from "../assets/logo.png"
const Logo = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  return (
    <div className={`w-16 h-16 transform rotate-0 transition-transform duration-300 ${isSpinning ? 'hover:rotate-180' : ''}`}
    onMouseEnter={() => setIsSpinning(true)}
      onMouseLeave={() => setIsSpinning(false)}
    >
        <img src={logo} />
    </div>
  )
}

export default Logo