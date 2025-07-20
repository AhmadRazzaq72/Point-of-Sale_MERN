import React from 'react'
import "./Dashboard.css"
import { Link } from 'react-router-dom'
const Dashboard = () => {
  return (
    <div className='container2'>
      <div className="bread">
        <div className="heading "><h1><span className="material-symbols-outlined me-1">dashboard</span>Dashboard</h1></div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">Home</li>
          </ol>
        </nav>
      </div>
      <div className="main">
        <div className="card" >
          <div className="card-body">
          <Link className="link" to="/sale"><li className='icons1'><span className="material-symbols-outlined">point_of_sale</span></li>Sale</Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
          <Link className="link" to="/product"><li className='icons1'><span className="material-symbols-outlined">inventory</span></li>Products</Link>
          </div>
        </div>
        <div className="card" >
          <div className="card-body">
          <Link className="link" to="/customers"><li className='icons1'><span className="material-symbols-outlined">group</span></li>Customer</Link>
          </div>
        </div>
        <div className="card" >
          <div className="card-body">
          <Link className="link" to="/suppliers"><li className='icons1'><span className="material-symbols-outlined">local_shipping</span></li>Supplier</Link>
          </div>
        </div>
        <div className="card" >
          <div className="card-body">
          <Link className="link" to="/salereport"><li className='icons1'><span className="material-symbols-outlined">analytics</span></li>Report</Link>
          </div>
        </div>
        <div className="card" >
          <div className="card-body">
          <Link className="link" to="logout"><li className='icons1'><span className="material-symbols-outlined">logout</span></li>Log Out</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard