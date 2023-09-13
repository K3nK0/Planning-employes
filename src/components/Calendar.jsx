import React from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"

export default function Calendar({employee}) {

  const handleEvents = () => {
    return employee.events
  }

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
        events = {[
          {title: "SSL",
          start: "2023-08-28T12:30:00+02:00",
          end: "023-08-28T14:00:00+02:00"
          }
        ]}
     />
  )
}
