import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from "react-router-dom"

export default function Navigation() {

  // TODO: using legacyBehavior as a workaround. This should be updated

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand className="mx-4">
        <Link to='/'>Type Racer</Link>
      </Navbar.Brand>
      <Navbar.Toggle className="m-3" />
      <Navbar.Collapse >
        <Nav>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : ""
            }
          >
            About
          </NavLink>
          {/* <Link to='/about' legacyBehavior>
            <a className={router.pathname == "/about" ? "active-link" : ""}>
              About
            </a>
          </Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}