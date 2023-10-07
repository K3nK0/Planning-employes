import "../../styles/management.css"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListEmployees } from "../../features/listEmployees";
import { getEmployees } from "../../utils/getEmpoyees";

import Employee from "./Employee"
import ModalAddEmployee from "./ModalAddEmployee";
import getHoursCalculate from "../../utils/getHoursCalculate";
import HourMeter from "../../components/HourMeter";

export default function Management() {

  const dispatch = useDispatch()

  const [showModalAddEmployee, setShowModalAddEmployee] = useState(false)
  const listEmployees = useSelector(state => state.listEmployees)
  // console.log("listemployee", listEmployees);
  const interval = useSelector(state => state.dateInterval)

  // useEffect(() => {
  //   getEmployees(dispatch, setListEmployees);
  // }, []);

  useEffect(() => {
    listEmployees.forEach(employee => {
      getHoursCalculate(dispatch, employee, interval)
    })
    
  }, [listEmployees, interval])

  return (
    <main className="page-management">
      <h2>Gestion des employés</h2>
      <div className="header-management">
        <button 
        onClick={() => setShowModalAddEmployee(true)}
        className="btn-add-employee">Ajouter un employé
        </button>
        <HourMeter />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Estimation d'heures</th>
            <th>Heures à faire</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listEmployees !== undefined &&(
            listEmployees.map(employee => (
              <Employee key={employee.id} employee={employee} />
            ))
          )}
        </tbody>

      </table>

      {showModalAddEmployee && createPortal(<ModalAddEmployee closeModalAddEmployee={() => setShowModalAddEmployee(false)} getEmployees={getEmployees} />, document.body)}

    </main>
  )
}
