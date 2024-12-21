import axios from 'axios'
import { SERVER } from '../server'


const axiosPatch = async (endpoint, data, token) => {
    const BASE_URL = `${SERVER}/`
    const config = {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    }

    try {
        const response = await axios.patch(`${BASE_URL}${endpoint}`, data, config)
        return response
        
    } catch (error) {
        console.log("patch err", error);
        
        return(error.response);
    }
}

export default axiosPatch