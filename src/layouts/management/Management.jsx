import "../../styles/management.css"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListEmployees } from "../../features/listEmployees";
import { getEmployees } from "../../utils/getEmpoyees";

import Employee from "./Employee"
import ModalAddEmployee from "./ModalAddEmployee";
import getHoursCalculate from "../../utils/getHoursCalculate";

export default function Management() {

  const dispatch = useDispatch()

  const [showModalAddEmployee, setShowModalAddEmployee] = useState(false)
  const listEmployees = useSelector(state => state.listEmployees)

  useEffect(() => {
    getEmployees(dispatch, setListEmployees);
  }, []);

  useEffect(() => {
    listEmployees.forEach(employee => {
      getHoursCalculate(dispatch, employee)
    })
    
  }, [listEmployees])

  return (
    <main className="page-management">
      <h2>Gestion des employés</h2>
      <button 
      onClick={() => setShowModalAddEmployee(true)}
      className="btn-add-employee">Ajouter un employé</button>
      <table>
        <thead>
          <tr>
            <th>prénom</th>
            <th>estimation d'heures</th>
            <th>heures à faire</th>
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
