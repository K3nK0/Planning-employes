import { NavLink } from "react-router-dom"
import "../styles/navbar.css"

export default function Navbar() {
  return (
    <nav className="left-side">
      <NavLink
      to="/">
        Gestion
      </NavLink>
    </nav>
)
}
