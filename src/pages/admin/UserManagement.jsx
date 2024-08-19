import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserManagementTable from "../../components/admin/UserManagementTable";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import TutorCard from "../../components/TutorCard";

const UserManagement = () => {
  const { role } = useParams();
  const [showTutor, setShowTutor] = useState(false);
  const [id, setId] = useState(null);
  const token = useSelector((state) => state.auth.access);
  const [data, setData] = useState([]);
  const [render, setRender] = useState("");

  const showCard = (id) => {
    setId(id);
    setShowTutor(true);
  };

  const reRender = (value) => {
    setRender(value);
  };

  const url = role === "TUTOR" 
    ? "http://127.0.0.1:8000/useradmin/tutor-list/" 
    : "http://127.0.0.1:8000/useradmin/student-list/";

  const label = role === "TUTOR" ? "Tutor Management" : "Student Management";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Error Fetching Data");
      }
    };
    fetchData();
  }, [url, token, render]);

  const closeCard = () => {
    setShowTutor(false)
  }
  return (
    <div className="relative">
      {showTutor ? (
        <TutorCard id={id} closeCard={closeCard}/>
      ) : (
        <UserManagementTable data={data} reRender={reRender} label={label} showCard={showCard} />
      )}
    </div>
  );
};

export default UserManagement;
