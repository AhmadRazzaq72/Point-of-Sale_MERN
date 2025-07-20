import React from 'react'
import "./Navbar.css"
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
   <div className="sidebar1">
        <Link className='link1' to="/"><div className="container1"><li className='icons'><span className="material-symbols-outlined">dashboard</span></li>Dashboard</div></Link>
        <Link className='link1' to="/sale"><div className="container1"><li className='icons'><span className="material-symbols-outlined">point_of_sale</span></li>Sale</div></Link>
        <Link className='link1' to="/product"><div className="container1"><li className='icons'><span className="material-symbols-outlined">inventory</span></li>Products</div></Link>
        <Link className='link1' to="/customers"><div className="container1"><li className='icons'><span className="material-symbols-outlined">group</span></li>Customer</div></Link>
        <Link className='link1' to="/suppliers"><div className="container1"><li className='icons'><span className="material-symbols-outlined">local_shipping</span></li>Supplier</div></Link>
        <Link className='link1' to="/salereport"><div className="container1"><li className='icons'><span className="material-symbols-outlined">analytics</span></li>Report</div></Link>
   </div>

  )
}

export default Navbar