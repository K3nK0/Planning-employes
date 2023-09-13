import React from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"

export default function Calendar({employee}) {

  return (
    <FullCalendar
        plugins = {[ dayGridPlugin, timeGridPlugin ]}
        initialView = "timeGridWeek"
        headerToolbar= {{
            left : "prev,today,next",
            center : "title",
            right : "timeGridDay,timeGridWeek,dayGridMonth"}
        }
        height="100%"
        droppable = "true"
        editable = "true"
        slotDuration = "00:15"
        locale = "frLocale"
        firstDay = "1"
        weekNumbers = "true"
        events = {employee.events}
     />
  )
}
