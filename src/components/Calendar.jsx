import { useState } from 'react'
import { createPortal } from "react-dom";

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../config/firebase";

import ModalAddClickEvent from './ModalAddClickEvent'
import { handleUpdateEvent } from '../features/listEmployees';

import { useDispatch, useSelector } from 'react-redux';

export default function Calendar({employee}) {

  const dispatch = useDispatch()

  const listEmployees = useSelector(state => state.listEmployees)
  const currentEmployee = listEmployees.find(employeeState => employeeState.id === employee.id)
  const listEvents = currentEmployee.eventsState

  const [showModalAddClickEvent, setShowModalAddClickEvent] = useState(false)
  const [newAddEvent, setNewAddEvent] = useState({
    start: "",
    end: ""
  })

  const handleSelect = (info) => {
    const event = {
      start: info.startStr,
      end: info.endStr
    }

    setNewAddEvent(event)
    setShowModalAddClickEvent(true)
  }

  const handleEventResize = async (info) => {
    const updateEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr
    }

    try {
      await updateDoc(doc(db,"employees", employee.id, "events", updateEvent.id), {
        "end": updateEvent.end
      })
    } catch (err) {
        console.log("error eventResize", err);
    }

    dispatch(handleUpdateEvent({"employeeId": employee.id, "event": updateEvent}))
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
          events = {listEvents}
          selectable = "true"
          select={handleSelect}
          eventResize={handleEventResize}
      />
      {showModalAddClickEvent && createPortal(<ModalAddClickEvent closeModal={() => setShowModalAddClickEvent(false)} event={newAddEvent} setNewAddEvent={setNewAddEvent} employee={employee} />, document.body)}
     </>
  )
}