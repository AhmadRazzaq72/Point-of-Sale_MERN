import React from 'react'
import { Link } from "react-router-dom"
const Header = () => {
  const mystyle = {
    marginLeft: "-113px",
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
  }
  return (
    <nav className="navbar navbar-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex justify-content align-items-center" to="/">
        Point of Sale</Link>
        <div className="dropdown m-2 " >
          <i className="fa-regular fa-user dropdown-toggle" data-bs-toggle="dropdown" id="dropdownMenuButton2" aria-expanded="false" style={{ color: "#ffffff", cursor: "pointer" }}>
            <ul className="dropdown-menu dropdown-menu-dark" style={mystyle} aria-labelledby="dropdownMenuButton2">
              <li><Link className="dropdown-item" to="#">Setting</Link></li>
              <li><Link className="dropdown-item" to="#">Log Out</Link></li>
            </ul>
          </i>
        </div>
      </div>
    </nav >
  )
}

export default Header