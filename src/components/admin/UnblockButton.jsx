import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SERVER } from '../../server'

const UnblockButton = ({id, reRender}) => {
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
            "is_blocked": false,
            "is_active": true
          }
        try {
            const response = await axios.patch(url, data, config)
            if(response.status === 200){
                toast.success(`${response.data.first_name} ${response.data.last_name} is unblocked`)
                reRender(`Unblocked ${id}`)
            }else{
                toast.error("No response from server")
            }
        } catch (error) {
            console.log(error);
            toast.error("Server error. Try again later")
        }
    }
    return (
        <button
        className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        onClick={handleClick}
        >Unblock</button>
      )
}

export default UnblockButton