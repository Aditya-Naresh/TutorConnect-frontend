import React, { useEffect, useState } from "react";
import DayCard from "../../components/DayCard";
import AddDateForm from "../../components/tutor/AddDateForm";
import Slider from "react-slick";
import { axiosGet } from "../../axios";
import { useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";

const TutorTimeSlots = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [render, setRender] = useState('')
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await axiosGet(`timeslots/available-dates/${auth.id}`, auth.access);
        console.log(response);
        setSelectedDates(response.data);
      } catch (error) {
        console.error("Failed to fetch dates:", error);
      }
    };
    fetchDates();
  }, [render]);

  const reRender = (value) => {
    setRender(value)
  }

  const [showForm, setShowForm] = useState(false)
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
      <button className={showForm? `bg-black text-red-500  mb-4 p-4 flex justify-center max-w-32`: `bg-slate-300 text-fuchsia-950 mb-4 p-4 flex justify-center max-w-32`} onClick={() => setShowForm(!showForm)}>{showForm? <CgClose/> : "Add Date"}</button>

      </div>
      {showForm ?
      <AddDateForm />:
      <div className="flex justify-center h-72">
        <Slider {...settings} className="bg-gray-100 p-2 rounded-lg shadow-lg w-screen max-w-screen-lg h-full">
          {selectedDates.length > 0 ? (
            selectedDates.map((date) => <DayCard key={date.id} date={date} reRender={reRender} render = {render} />)
          ) : (
            <p>No dates available</p>
          )}
        </Slider>
      </div>
  }
    </div>
  );
};

export default TutorTimeSlots;
