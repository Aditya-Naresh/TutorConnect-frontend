import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserManagementTable from "../../components/admin/UserManagementTable";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import TutorCard from "../../components/TutorCard";
import { SERVER } from "../../server";

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

  const url =
    role === "TUTOR"
      ? `${SERVER}/useradmin/tutor-list/`
      : `${SERVER}/useradmin/student-list/`;

  const label = role === "TUTOR" ? "Tutor" : "Student";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Error Fetching Data", {position: "top-center"});
      }
    };
    fetchData();
  }, [url, token, render]);

  const closeCard = () => {
    setShowTutor(false);
  };
  return (
    <div className="relative">
      <header className="bg-gray-100 p-4 shadow-md mb-4 flex justify-center">
        <h1 className="text-xl font-bold">{label} Management</h1>
      </header>

      {showTutor ? (
        <TutorCard id={id} closeCard={closeCard} />
      ) : (
        <UserManagementTable
          data={data}
          reRender={reRender}
          label={label+"s"}
          showCard={showCard}
        />
      )}
    </div>
  );
};

export default UserManagement;
