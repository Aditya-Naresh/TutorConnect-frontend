import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SERVER } from '../../server'

const BlockButton = ({id, reRender}) => {
    const url = `${SERVER}/useradmin/update-user/${id}`
    const token = useSelector((state) => state.auth.access)
    const handleClick = async (e) => {
        e.preventDefault()
        const config = {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        }
        const data = {
            "is_blocked": true,
            "is_active": false
          }
        try {
            const response = await axios.patch(url, data, config)
            if(response.status === 200){
                toast.info(`${response.data.first_name} ${response.data.last_name} is blocked`)
                reRender(`blocked ${id}`)
            }
        } catch (error) {
            console.log(error);
            toast.error("Server error. Try again later")
        }
    }
  return (
    <button
    onClick={handleClick}
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
    >Block</button>
  )
}

export default BlockButton