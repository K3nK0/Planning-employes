import { useState } from "react"
import "../../styles/employee.css"
import { createPortal } from "react-dom"
import ModalDeleteEmployee from "./ModalDeleteEmployee"
import ModalUpdateEmployee from "./ModalUpdateEmployee"
import { formatHour } from "../../utils/formatHour"
import { useEffect } from "react"
import getHoursCalculate from "../../utils/getHoursCalculate"
import { useDispatch, useSelector } from "react-redux"

export default function Employee({employee}) {

  const dispatch = useDispatch()
  const interval = useSelector(state => state.dateInterval)

  useEffect(() => {
    getHoursCalculate(dispatch, employee, interval)
  }, [employee])
  
  const hoursCalculate = formatHour(employee.estimatedHours)
  const [showModalDeleteEmployee, setShowModalDeleteEmployee] = useState(false)
  const [showModalUpdateEmployee, setShowModalUpdateEmployee] = useState(false)
  
  return (
    <>
      <tr>
        <th>{employee.firstName}</th>
        <th>{employee.lastName}</th>
        <th>{employee.email}</th>
        <td>{hoursCalculate}</td>
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
