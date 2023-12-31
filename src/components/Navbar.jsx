import { NavLink } from "react-router-dom"
import "../styles/navbar.css"
import employe from "../assets/employe.svg"
import employees from "../assets/employees.svg"
import { useSelector } from "react-redux"

export default function Navbar() {

  const listEmployees = useSelector(state => state.listEmployees)
  const userConnect = useSelector(state => state.userConnected)

  return (
    <nav className="left-side">
      {userConnect.role === "admin" &&(
        <><NavLink
        className="link-navbar"
        to="/management">
            <span>Gestion</span>
            <img src={employees} alt="" className="icon-nav" />
        </NavLink>

        {listEmployees.map(employee => (
          <NavLink
          className="link-navbar"
          key={employee.id}
          to={{
            pathname: `/profile/${employee.id}`
            }} >
              <span>{employee.lastName} {employee.firstName}</span>
              <img src={employe} alt="" className="icon-nav" />
          </NavLink>
        ))}

        </>

      )}
      
      {/* {userConnect.role === "admin" &&(
        (listEmployees.map(employee => (
          <NavLink
          className="link-navbar"
          key={employee.id}
          to={{
            pathname: `/profile/${employee.id}`
            }} >
              <span>{employee.lastName} {employee.firstName}</span>
              <img src={employe} alt="" className="icon-nav" />
          </NavLink>
        )))
      )} */}
    </nav>
  )
}
