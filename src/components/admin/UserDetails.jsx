import React from 'react'

const UserDetails = ({id, showCard}) => {
    const handleClick = () => {
        showCard(id)
    }
  return (
    <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"  onClick={handleClick}>
       UserDetails
    </button>
  )
}

export default UserDetails