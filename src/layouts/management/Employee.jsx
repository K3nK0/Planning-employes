import { useState } from "react"
import "../../styles/employee.css"
import { createPortal } from "react-dom"
import ModalDeleteEmployee from "./ModalDeleteEmployee"

export default function Employee({employee}) {

  const [showModalDeleteEmployee, setShowModalDeleteEmployee] = useState(false)
  
  return (
    <>
      <tr>
        <th>{employee.name}</th>
        <td>{employee.estimatedHours}</td>
        <td>{employee.hoursToDo}H</td>
        <td className="btns-employee">
          <button className="btn-valid">modifier</button>
          <button 
          className="btn-delete"
          onClick={() => setShowModalDeleteEmployee(true)}
          >supprimer</button>
        </td>
      </tr>
      {showModalDeleteEmployee && createPortal(<ModalDeleteEmployee closeModal={() => setShowModalDeleteEmployee(false)} employee={employee} />, document.body)}
    </>
  )
}
