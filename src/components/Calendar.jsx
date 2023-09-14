import React from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { createPortal } from "react-dom";
import ModalAddClickEvent from './ModalAddClickEvent'
import { useState } from 'react'

export default function Calendar({employee}) {

  const [showModalAddClickEvent, setShowModalAddClickEvent] = useState(false)
  const [newAddEvent, setNewAddEvent] = useState({
    start: "",
    end: ""
  })

  const handleSelect = (info) => {
    // console.log("info",info);
    const event = {
      start: info.startStr,
      end: info.endStr
    }

    setNewAddEvent(event)
    console.log(newAddEvent);

    setShowModalAddClickEvent(true)
    console.log(showModalAddClickEvent);

  }

  return (
    <>
      <FullCalendar
          plugins = {[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
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
          selectable = "true"
          select={handleSelect}
      />
      {showModalAddClickEvent && createPortal(<ModalAddClickEvent closeModal={() => setShowModalAddClickEvent(false)} event={newAddEvent} setNewAddEvent={setNewAddEvent} employee={employee} />, document.body)}
     </>
  )
}
