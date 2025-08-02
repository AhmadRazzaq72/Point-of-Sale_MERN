import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { to: '/', icon: 'dashboard', label: 'Dashboard' },
    { to: '/sale', icon: 'point_of_sale', label: 'Sale' },
    { to: '/product', icon: 'inventory', label: 'Products' },
    { to: '/customers', icon: 'group', label: 'Customers' },
    { to: '/suppliers', icon: 'local_shipping', label: 'Suppliers' },
    { to: '/salereport', icon: 'analytics', label: 'Reports' },
  ];

  return (
    <div className="sidebar-slim">
      {navItems.map((item, index) => (
        <Link key={index} className="nav-link-slim" to={item.to}>
          <div className="nav-item-slim">
            <span className="material-symbols-outlined nav-icon">{item.icon}</span>
            <span className="nav-tooltip">{item.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
