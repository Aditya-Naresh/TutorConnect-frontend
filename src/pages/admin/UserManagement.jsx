import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserManagementTable from "../../components/admin/UserManagementTable";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UserManagement = () => {
  const { role } = useParams();
 
  
  const token = useSelector((state) => state.auth.access);
  const [data, setData] = useState([]);
  const [render , setRender] = useState("")
  
  const reRender = (value) => {
    setRender(value)
  } 
  let url
  if (role === "TUTOR"){
    url = "http://127.0.0.1:8000/useradmin/tutor-list/";
  }else{
    url = "http://127.0.0.1:8000/useradmin/student-list/";
  }

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(url, config);
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Error Fetching Data");
      }
    };
    fetchData();
  }, [role, render]);
  return (
    <div className="relative">
      <UserManagementTable data={data} reRender={reRender}/>
    </div>
  );
};

export default UserManagement;
