import "../../styles/management.css"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom";

import Employee from "./Employee"
import ModalAddEmployee from "./ModalAddEmployee";

import { collection, getDocs } from "firebase/firestore";
import {db} from "../../config/firebase"

export default function Management() {

  const [showModalAddEmployee, setShowModalAddEmployee] = useState(false)
  const [listEmployees, setListEmployees] = useState()

  const getEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setListEmployees(employees)
  }

  useEffect(() => {
    getEmployees()
  }, [listEmployees]);

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
