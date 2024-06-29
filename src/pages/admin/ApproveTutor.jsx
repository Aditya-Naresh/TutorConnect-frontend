import React, { useEffect, useState } from 'react'
import UserManagementTable from '../../components/admin/UserManagementTable'
import { useSelector } from 'react-redux'
import { axiosGet } from '../../axios'
import TutorCard from '../../components/TutorCard'

const ApproveTutor = () => {
    const token = useSelector((state) => state.auth.access)
    const [data, setData] = useState([])
    const [showTutor, setShowTutor] = useState(false)
    const [id, setId] = useState()
    const showCard = (id) => {
        setId(id)
        setShowTutor(true)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosGet('useradmin/tutor/approval/', token)
                setData(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])
  return (
    <div className='relative'>
        {showTutor?
        <TutorCard id={id}/> :
        <UserManagementTable data={data} blockUser={false} showCard={showCard}/>
    }
    </div>
  )
}

export default ApproveTutor