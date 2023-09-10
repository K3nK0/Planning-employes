import { useState } from "react"
import "../../styles/employee.css"
import { createPortal } from "react-dom"
import ModalDeleteEmployee from "./ModalDeleteEmployee"
import ModalUpdateEmployee from "./ModalUpdateEmployee"

export default function Employee({employee}) {

  const [showModalDeleteEmployee, setShowModalDeleteEmployee] = useState(false)
  const [showModalUpdateEmployee, setShowModalUpdateEmployee] = useState(false)
  
  return (
    <>
      <tr>
        <th>{employee.name}</th>
        <td>{employee.estimatedHours}</td>
        <td>{employee.hoursToDo}H</td>
        <td className="btns-employee">
          <button 
          className="btn-valid"
          onClick={() => setShowModalUpdateEmployee(true)}
          >modifier</button>
          <button 
          className="btn-delete"
          onClick={() => setShowModalDeleteEmployee(true)}
          >supprimer</button>
        </td>
      </tr>
      {showModalDeleteEmployee && createPortal(<ModalDeleteEmployee closeModal={() => setShowModalDeleteEmployee(false)} employee={employee} />, document.body)}
      {showModalUpdateEmployee && createPortal(<ModalUpdateEmployee closeModal={() => setShowModalUpdateEmployee(false)} employee={employee} />, document.body)}
    </>
  )
}
