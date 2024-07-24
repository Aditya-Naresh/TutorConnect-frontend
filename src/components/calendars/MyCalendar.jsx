import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth'
import '../../index.css'
import { useNavigate } from 'react-router-dom';
import interactionPlugin from '@fullcalendar/interaction';


export default function MyCalendar({events, dayClickAction}) {
  const navigate = useNavigate()

  const eventClickAction = (data) => {
    console.log(data.event.id);
    navigate(`/timeslot-details/${data.event.id}`)
  }

  
    return (
       

      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin, interactionPlugin ]}
        initialView="timeGridDay"
        events={events}
        eventClick={eventClickAction}
        dateClick={dayClickAction}
        headerToolbar = {{
            left: "prev,next",
            center:"title",
            right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        />
        
    )
  }