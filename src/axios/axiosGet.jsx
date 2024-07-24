import axios from 'axios'
import React from 'react'


const axiosGet = async (endpoint, token) => {
    const BASE_URL = "http://127.0.0.1:8000/"
    const config = {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    }

    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`,  config)
        return response
        
    } catch (error) {
        console.log(error);
        if(error.response.status === 404){
            return {"message": "Not Found", "status":404}
        }
    }
}

export default axiosGet