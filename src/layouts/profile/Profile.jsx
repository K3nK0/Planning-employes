import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import Calendar from "../../components/Calendar";
import BtnAddEvent from "../../components/BtnAddEvent";

import "../../styles/profile.css"
import { formatHour } from "../../utils/formatHour";

export default function Profile() {

  const params = useParams()

  const listEmployees = useSelector(state => state.listEmployees)
  const currentEmployee = listEmployees.find(employee => employee.id === params.id)
  const hoursCalculate = formatHour(currentEmployee.estimatedHours)

  // console.log("list employee",currentEmployee);

  return (
    <div className="container-profile">

      <h2>Planning de {currentEmployee.name}</h2>

      <div className="info-employee">
        <p>Compteur d'heure: {hoursCalculate} / {currentEmployee.hoursToDo}</p>
        <BtnAddEvent />
      </div>
      
      <Calendar employee={currentEmployee} />

    </div>
  )
}
