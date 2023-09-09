import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";

import Employee from "./Employee"
import {db} from "../../config/firebase"

export default function Management() {

  const [listEmployees, setListEmployees] = useState()

  const getEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    // console.log("employées",employees);

    setListEmployees(employees)
    console.log("list employees",listEmployees);
  }

  useEffect(() => {
    getEmployees()
  }, [])
  
  console.log("list employees",listEmployees);

  return (
    <main>
      <h2>Gestion des employés</h2>
      <button className="btn-add-employee">Ajouter un employé</button>
      {listEmployees !== undefined &&(
        listEmployees.map(employee => (
          <Employee id={employee.id} employee={employee} />
        ))
      )}
    </main>
  )
}
