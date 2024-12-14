import React from 'react'
import { useDispatch } from 'react-redux'
import { setEditSlotModalOn } from '../../../redux/slices/timeSlotSlice'

const EditButton = () => {
  const dispatch = useDispatch()
  const handleClick = () =>{
    dispatch(setEditSlotModalOn())
  }
  return (
    <button className="border border-gray-500 text-gray-700 hover:bg-gray-300 font-semibold py-2 px-4 rounded" onClick={handleClick}>
      Edit Time
    </button>
  )
}

export default EditButton
