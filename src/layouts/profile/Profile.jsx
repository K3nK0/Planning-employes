import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import Calendar from "../../components/Calendar";

import "../../styles/profile.css"
import { formatHour } from "../../utils/formatHour";
import { useState } from "react";
import { createPortal } from "react-dom";
import ModalAddEvent from "./ModalAddEvent";

export default function Profile() {

  const params = useParams()

  const listEmployees = useSelector(state => state.listEmployees)
  const currentEmployee = listEmployees.find(employee => employee.id === params.id)
  const hoursCalculate = formatHour(currentEmployee.estimatedHours)

  const [showModalAddEvent, setShowModalAddEvent] = useState(false)

  return (
    <>
    <div className="container-profile">

      <h2>Planning de {currentEmployee.lastName} {currentEmployee.firstName}</h2>

      <div className="info-employee">
        <p>Compteur d'heure: {hoursCalculate} / {currentEmployee.hoursToDo}</p>
        <button
        className="btn-add-event"
        onClick={() => setShowModalAddEvent(true)}
        >
          Ajouter un événement
        </button>
      </div>
      
      <Calendar employee={currentEmployee} />

      {showModalAddEvent && createPortal(<ModalAddEvent closeModal={() => setShowModalAddEvent(false)} employeeID={currentEmployee.id} />, document.body)}

    </div>
    </>
  )
}
