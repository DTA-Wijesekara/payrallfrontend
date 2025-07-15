import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { House, Person } from 'react-bootstrap-icons';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(prev => !prev);

  const sideWidth = collapsed ? 60 : 200;

  return (
    <div
      className="d-none d-md-flex flex-column custom-sidebar vh-100 p-3 transition-all"
      style={{ width: sideWidth }}
    >
      {/* toggle button */}
      <button
        className="btn btn-sm btn-outline-secondary mb-4 align-self-end"
        onClick={() => setCollapsed(c => !c)}
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>

      <NavLink className="nav-link d-flex align-items-center mb-2" to="/home">
        <House className="me-2" size={20} />
        {!collapsed && 'Dashboard'}
      </NavLink>

      {/* Profile */}
      <NavLink className="nav-link d-flex align-items-center mb-2" to="/profile">
        <Person className="me-2" size={20} />
        {!collapsed && 'Profile'}
      </NavLink>


      {/* add more links here */}
    </div>
  );
}