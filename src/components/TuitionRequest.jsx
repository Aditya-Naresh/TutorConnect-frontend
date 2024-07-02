import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosGet, axiosPatch, axiosPost } from "../axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const TuitionRequest = ({ id, setShowReqForm }) => {
  const auth = useSelector((state) => state.auth);
  const { role, access } = auth;
  const [request, setRequest] = useState(null);

  const fetchRequestDetails = async () => {
    try {
      const response = await axiosGet(
        `timeslots/tuition-request/${id}`,
        access
      );
      if (response.status === 200) {
        setRequest(response.data);
      } else {
        console.error("Failed to fetch request details:", response.data);
      }
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };

  const navigate = useNavigate();
  const handleAccept = async () => {
    try {
      const formData = {
        ...request,
        is_accepted: true,
        tutor_viewed: true,
      };
      const response = await axiosPatch(
        `timeslots/tuition-request/${id}`,
        formData,
        access
      );
      if (response?.status === 200) {
        console.log("Request accepted successfully:", response.data);
        toast.success("Request accepted");
        setShowReqForm(false);
        navigate("/");
      } else {
        console.error("Failed to accept request:", response.data);
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async () => {
    try {
      const formData = {
        ...request,
        is_accepted: false,
        tutor_viewed: true,
      };
      const response = await axiosPatch(
        `timeslots/tuition-request/${id}`,
        formData,
        access
      );
      if (response.status === 200) {
        console.log("Request rejected successfully:", response.data);
        toast.info("Request rejected");
        setShowReqForm(false);
        navigate("/");
      } else {
        console.error("Failed to reject request:", response.data);
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, [id, role]);

  if (!request) {
    return null;
  }

  const handleClose = async () => {
    const formData = {
        student_viewed :true
    }
    try {
        const response = await axiosPatch(
            `timeslots/tuition-request/${id}`,
            formData,
            access
        )
        if (response.status === 200) {
            console.log("Request rejected successfully:", response.data);
            setShowReqForm(false);
            navigate("/")
        }
    } catch (error) {
        console.log(error);
    }
  };

  const handleTimeSlots = async () =>{
    const formData = {
        student_viewed :true
    }
    try {
        const response = await axiosPatch(
            `timeslots/tuition-request/${id}`,
            formData,
            access
        )
        if (response.status === 200) {
            console.log("Request rejected successfully:", response.data);
            setShowReqForm(false);
            navigate(`/book-slots/${request.tutor}`)
        }
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div className="tutor-request bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">
        {role === "TUTOR" && "Tutor Request"}{" "}
        {role === "STUDENT" && request.is_accepted
          ? "Tutor Accepted"
          : "Tutor Rejected"}
      </h2>
      <p>
        <strong>Requested by:</strong> {request.student_name}
      </p>
      <p>
        <strong>Subject:</strong> {request.subject_name}
      </p>
      <p>
        <strong>Message:</strong> {request.message}
      </p>
      <p>
        <strong>Requested At:</strong>{" "}
        {new Date(request.created_at).toLocaleString()}
      </p>
      {role === "TUTOR" && (
        <div className="mt-4 flex space-x-2">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      )}
      {role === "STUDENT" && (
        <div className="mt-4 flex space-x-2">
          {request.is_accepted ? (
            <button className="bg-emerald-500 text-white py-2 px-4 hover:bg-emerald-600"
                onClick={handleTimeSlots}
            >
              Select Time Slots
            </button>
          ) : (
            <button
              className="bg-slate-500 text-white py-2 px-4 rounded hover:bg-slate-600"
              onClick={handleClose}
            >
              Close
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TuitionRequest;
