import React from 'react'
import { useSelector } from 'react-redux'
import TutorProfile from '../components/tutor/TutorProfile'

const Profile = () => {
  const role = useSelector((state) => state.auth.role)
  return (
    <div>
      Common Profile form

      {role === 'TUTOR' && <TutorProfile />}
    </div>
  )
}

export default Profile