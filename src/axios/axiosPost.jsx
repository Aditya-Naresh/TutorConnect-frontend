import axios from 'axios'
import React from 'react'


const axiosPost = async (endpoint, data, token) => {
    const BASE_URL = "http://127.0.0.1:8000/"
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