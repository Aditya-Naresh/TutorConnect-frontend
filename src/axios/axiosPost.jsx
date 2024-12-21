import axios from 'axios'
import React from 'react'
import { SERVER } from '../server'


const axiosPost = async (endpoint, data, token) => {
    const BASE_URL = `${SERVER}/`
    const config = {
        headers:{
            "Authorization": token? `Bearer ${token}` : null,
        }
    }

    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, data, config)
        return response
        
    } catch (error) {
        console.log(error);
        return error.response
    }
}

export default axiosPost