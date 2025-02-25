import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import "../../index.css";
import { useLocation, useNavigate } from "react-router-dom";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function MyCalendar({ events, dayClickAction }) {
  const navigate = useNavigate();
  const eventClickAction = (data) => {
    console.log(data.event.id);
    navigate(`/timeslot-details/${data.event.id}`);
  };

  const today = dayjs().format("YYYY-MM-DD");
  const now = dayjs().format("YYYY-MM-DDTHH:mm:ss");
  let history = false;
  if (window.location.href.includes("/session-history")) {
    history = true;
  }

  const handleDateClick = (arg) => {
    const clickedDate = dayjs(arg.date);
    const currentTime = dayjs();

    if (clickedDate.isAfter(currentTime)) {
      dayClickAction(arg);
    } else {
      toast.warning("Cannot create events in the past", {
        position: "top-center",
      });
    }
  };

  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        multiMonthPlugin,
        interactionPlugin,
      ]}
      initialView="dayGridMonth"
      events={events}
      eventClick={eventClickAction}
      dateClick={handleDateClick}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      validRange={history ? {} : { start: today }}
      selectable={true}
      selectConstraint={history ? {} : { start: now }}
      height="79%"
    />
  );
}
