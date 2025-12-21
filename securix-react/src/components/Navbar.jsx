import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-header">
      <h2 className="brand">Securix Service</h2>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/team">Team</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/admin" className="admin-link">Admin</NavLink>
      </nav>
    </header>
  );
}
