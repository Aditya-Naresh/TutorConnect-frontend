import React, { useEffect, useState } from "react";
import { axiosGet } from "../../axios";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import TutorCard from '../../components/TutorCard'
import SearchBar from "../../components/student/SearchBar";
import RequestForm from "../../components/student/RequestForm";

const Tutorlist = () => {
  const [tutors, setTutors] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [tutorSubjects, setTutorSubjects] = useState({})
  const [tutorId, setTutorId] = useState()
  const fetchTutors = async (keyword = '') => {
    try {
      let url = 'timeslots/tutor-list/';
      if (keyword) {
        url += `?keyword=${keyword}`;
      }
      const response = await axiosGet(url, auth.access);
      setTutors(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSearch = (keyword) => {
    fetchTutors(keyword);
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  return (
    <div className="tutor-list">
      <h2 className="text-cyan-200 font-bold flex justify-center">Tutors List</h2>
      <div className="flex justify-center mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex  justify-center h-72">
      {
        showRequestForm?
        <RequestForm tutorId = {tutorId} subjects={tutorSubjects}/>
        :
        <Slider {...sliderSettings} className="bg-gray-100 p-2 rounded-lg shadow-lg w-screen max-w-screen-lg h-full">
        {tutors.map((tutor) => (
          <div key={tutor.id}>
            <TutorCard data={tutor} setShowRequestForm={setShowRequestForm} setTutorSubjects={setTutorSubjects} setTutorId={setTutorId}/>
          </div>
        ))}
      </Slider>}
      </div>
    </div>
  );
};

export default Tutorlist;
