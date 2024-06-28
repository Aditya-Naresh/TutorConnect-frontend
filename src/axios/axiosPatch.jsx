import axios from 'axios'
import React from 'react'


const axiosPatch = async (endpoint, data, token) => {
    const BASE_URL = "http://127.0.0.1:8000/"
    const config = {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    }

    try {
        const response = await axios.patch(`${BASE_URL}${endpoint}`, data, config)
        return response
        
    } catch (error) {
        console.log(error);
    }
}

export default axiosPatch