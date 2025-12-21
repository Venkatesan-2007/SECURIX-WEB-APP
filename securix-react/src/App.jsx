import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Splash from "./components/Splash";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./components/Admin";

export default function App() {
  return (
    <div className="app-root">
      {/* Splash overlays page until dismissed */}
      <Splash />

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
