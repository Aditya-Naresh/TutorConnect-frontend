import axios from 'axios'
import React from 'react'
import { SERVER } from '../server'


const axiosDelete = async (endpoint, token) => {
    const BASE_URL = `${SERVER}/`
    const config = {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    }

    try {
        const response = await axios.delete(`${BASE_URL}${endpoint}`, config)
        return response
        
    } catch (error) {
        console.log(error);
    }
}

export default axiosDelete