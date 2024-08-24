import React, { useEffect, useState } from "react";
import { axiosGet } from "../../axios";
import { useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";
import axiosDelete from "../../axios/axiosDelete";
import SubjectForm from "./SubjectForm";
import { toast } from "react-toastify";
import { BsPlus } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

const SubjectList = () => {
  const token = useSelector((state) => state.auth.access);
  const [data, setData] = useState([]);
  const [render, setRender] = useState("");
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosGet("/accounts/subject/", token);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [render]);

  const reRender = (value) => {
    setRender(value);
  };

  const onDelete = async (id) => {
    try {
      const response = await axiosDelete(`accounts/subject/${id}`, token);
      console.log(response);
      if (response.status === 204) {
        setRender(`Deleted ${id}`);
        toast.success("Subject was deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-bold text-emerald-900 text-md md:text-xl">Subjects: </h2>
        <button
          type="submit"
          className={`${
            showForm ? "bg-red-500" : "bg-blue-500"
          } text-black p-2 rounded`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <CgClose /> : <BsPlus />}
        </button>
      </div>
      <ul className="text-black p-4 flex">
        {data.map((subject) => (
          <li key={subject.id} className="flex flex-row m-2 text-sm md:text-md">
            {subject.name}{" "}
            <button
              className="ml-2 bg-red-500 text-sm rounded"
              onClick={() => onDelete(subject.id)}
            >
              <BiTrash color="white" />
            </button>
          </li>
        ))}
      </ul>
      <div className="relative">
        {showForm && <SubjectForm reRender={reRender} />}
      </div>
    </div>
  );
};

export default SubjectList;
