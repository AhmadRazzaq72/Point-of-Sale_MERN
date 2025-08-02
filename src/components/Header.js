import React from 'react'
import { Link } from "react-router-dom"
import './Header.css';
const Header = () => {
  const dropdownStyle = {
    marginLeft: "-113px",
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
  }

  return (
    <nav className="navbar navbar-sm bg-dark navbar-dark header">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          Point of Sale
        </Link>
        <div className="dropdown">
          <i
            className="fa-regular fa-user dropdown-toggle"
            data-bs-toggle="dropdown"
            id="dropdownMenuButton2"
            aria-expanded="false"
            style={{ color: "#ffffff", cursor: "pointer" }}
          ></i>
          <ul
            className="dropdown-menu dropdown-menu-dark"
            style={dropdownStyle}
            aria-labelledby="dropdownMenuButton2"
          >
            <li><Link className="dropdown-item" to="#">Setting</Link></li>
            <li><Link className="dropdown-item" to="#">Log Out</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
