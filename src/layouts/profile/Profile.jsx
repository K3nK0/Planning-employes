import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";

export default function Profile() {

  const params = useParams()

  const listEmployees = useSelector(state => state.listEmployees)
  const currentEmployee = listEmployees.find(employee => employee.id === params.id)

  return (
    <div>
      <h2>Planning de {currentEmployee.name}</h2>
    </div>
  )
}
