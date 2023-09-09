import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";

import Employee from "./Employee"
import {db} from "../../config/firebase"

import "../../styles/management.css"

export default function Management() {

  const [listEmployees, setListEmployees] = useState()

  const getEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    // console.log("employées",employees);

    setListEmployees(employees)
  }

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <main className="page-management">
      <h2>Gestion des employés</h2>
      <button className="btn-add-employee">Ajouter un employé</button>
      <table>
        <thead>
          <tr>
            <th>prénom</th>
            <th>estimation d'heures</th>
            <th>heures à faire</th>
            <th></th>
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
    </main>
  )
}
