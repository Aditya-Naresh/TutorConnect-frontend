import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MyCalendar from "./calendars/MyCalendar";
import { useSelector } from "react-redux";
import { axiosGet } from "../axios";
import { Box } from "@mui/material";
import MultiSelectForm from "./forms/MultiSelectForm";
import DatePickerForm from "./forms/DatePickerForm";
import dayjs from "dayjs";
import MyModal from "./utils/Modal";
import { useParams } from "react-router-dom";


const Calendar = () => {
  const [formData, setFormData] = useState({
    className: '',
    start: '',
  })

  const [render, setRender] = useState('')

  const reRender = (value) => {
    setRender(value)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name] : value
    }) 
  }

  const {access, role} = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState([])
  const [fromDate, setFromDate] = useState(null)



  
  const fromDateChange = (newDate) => {
    setFromDate(newDate)
  }
  const [toDate, setToDate] = useState(null)

  const toDateChange = (newDate) => {
    setToDate(newDate)
  }

  const filteredEvents = events.filter((event) => {
    return selectedStatus.includes(event.className) &&
    (!fromDate || dayjs(event.start).isAfter(fromDate,"day")) &&
    (!toDate || dayjs(event.start).isBefore(toDate,"day"))
  })
  const fetchEvents = async (url) => {
    const response = await axiosGet(url, access);
    setEvents(response.data);
    setStatus([...new Set(response.data.map((event) => event.className))])
    setSelectedStatus([...new Set(response.data.map((event) => event.className))])
    setLoading(false)
  };

  

  let url
  if(role === 'TUTOR'){
    url = 'timeslots/tutor_timeslots/'
  }else if (role === 'STUDENT' && window.location.href.includes('/book-slots/')){
    const {tutor_id} = useParams()
    url = `timeslots/tutor_timeslots/${tutor_id}`
  }else if (role === 'STUDENT'){
    url = 'timeslots/student_timeslots/'
  }

  useEffect(() => {
    fetchEvents(url)
  }, [render, access]);



  // Modal
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState([false])
  const handleOpen = (info) => {
    setOpen(true)
    setSelectedDate(info.dateStr)
    setFormData({
      className: '',
      start: dayjs(info.dateStr),
    })
  }
  const handleClose = () => {
    setOpen(false)
    setFormData({
      className: '',
      start: '',
    })
  }

  return (
    <div>
      { loading ? <p>Loading the data</p>:

        <>
        <MyModal handleChange={handleChange} formData={formData} open={open} handleClose={handleClose} myDate={selectedDate} reRender={reRender}/>
        <Box
        sx={{
          boxShadow: 3,
          padding: "20px",
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "20px",
        }}
        >
        <Box sx={{backgroundColor:"#d1e2eb", width:{xs:"100%", md:"30%"}} }>
          <MultiSelectForm label={"Status"} options={status} setSelectedValue={setSelectedStatus} selectedValue={selectedStatus}/>
        </Box>
        <Box sx={{backgroundColor:"#d1e2eb", width:"30%",  paddingTop:"1px", paddingBottom:"8px", paddingX:"8px"}} className="hidden md:block">
          <DatePickerForm label={"From Date"} value={fromDate} setValue={fromDateChange}/>
        </Box>
        <Box sx={{backgroundColor:"#d1e2eb", width:"30%",  paddingTop:"1px", paddingBottom:"8px", paddingX:"8px"}} className="hidden md:block">
          <DatePickerForm label={"To Date"} value={toDate} setValue={toDateChange} />
        </Box>
      </Box>
      <Box sx={{ boxShadow: 3, padding: "20px" }}>
        <MyCalendar events={filteredEvents} dayClickAction={handleOpen} />;
      </Box>
          </>
  }
    </div>
  )
};

export default Calendar;
