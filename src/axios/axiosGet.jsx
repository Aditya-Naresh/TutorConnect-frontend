import axios from "axios";
import { SERVER } from "../server";

const axiosGet = async (endpoint, token) => {
  const BASE_URL = `${SERVER}/`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, config);
    return {
      data: response.data,
      status: response.status,
      message: "Success",
    };
  } catch (error) {
    console.log(error.response);
    if (error.response.status === 404) {
      return { message: "Not Found", status: 404 };
    } else {
      return { message: "Error", status: error.status, data: [] };
    }
  }
};

export default axiosGet;
