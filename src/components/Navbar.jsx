import { NavLink } from "react-router-dom"
import "../styles/navbar.css"
import employe from "../assets/employe.svg"
import employees from "../assets/employees.svg"

export default function Navbar() {
  return (
    <nav className="left-side">
      <NavLink
      to="/">
          <span>Gestion</span>
          <img src={employees} alt="" className="icon-nav" />
      </NavLink>
    </nav>
)
}
