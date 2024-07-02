import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosGet } from "../axios";
import ApproveTutor from "./admin/ApproveTutor";

const TutorCard = ({ id, data, setShowRequestForm, setTutorSubjects, setTutorId }) => {
  const auth = useSelector((state) => state.auth);
  const [tutor, setTutor] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const role = auth.role;

  const handleClick = (e) => {
    e.preventDefault();
    setShowRequestForm(true);
    setTutorSubjects(data.subjects)
    setTutorId(data.id)
  };
  const fetchData = async () => {
    try {
      const response = await axiosGet(
        `useradmin/update-user/${id}`,
        auth.access
      );
      if (response.status === 200) {
        setTutor(response.data);
        try {
          const cert_res = await axiosGet(
            `useradmin/certificates/${id}`,
            auth.access
          );
          setCertifications(cert_res.data);
          const sub_res = await axiosGet(
            `useradmin/subjects/${id}`,
            auth.access
          );
          setSubjects(sub_res.data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth.role === "ADMIN") {
      fetchData();
    } 
  }, []);
  return (
    <div className="max-w-sm w-full mx-auto bg-lime-100 p-8 shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-2">
        {role === "ADMIN"
          ? tutor.first_name && tutor.last_name
            ? `${tutor.first_name} ${tutor.last_name}`
            : "Loading..."
          : data.first_name && data.last_name
          ? `${data.first_name} ${data.last_name}`
          : "Loading..."}
      </h2>

      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Subjects:</span>{" "}
        {role === "ADMIN"?
        subjects?.map((subject) => subject.name).join(", "):
        data.subjects?.map((subject) => subject.name).join(", ")
      }

      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Rate per hour:</span>{" "}
        {role === "ADMIN" ? `${tutor.rate}` : `${data.rate}`}
      </p>
      {role === "ADMIN" && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Certification</th>
              <th className="py-2 px-4 bg-gray-200">Image</th>
            </tr>
          </thead>
          <tbody>
            {certifications.map((cert, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border">{cert.title}</td>
                <td className="py-2 px-4 border">
                  <img src={cert.image} alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-center mt-4">
        {role === "ADMIN" && <ApproveTutor id={tutor.id} />}
        {role === "STUDENT" && (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={(e) => handleClick(e)}
          >
            Request Tutor
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorCard;
