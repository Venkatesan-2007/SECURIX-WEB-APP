import React from "react";
import { useNavigate } from "react-router-dom";
import CurrentTime from "../components/CurrentTime";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div id="animated-bg">
        <div className="particle p1" />
        <div className="particle p2" />
        <div className="particle p3" />
        <div className="particle p4" />
        <div className="particle p5" />
      </div>

      <section id="hero" className="hero main-section">
        <h1>We Secure Your Smarter Future</h1>
        <p>Cybersecurity experts providing advanced protection, trainings and security audits for the next-gen innovators. Explore our projects, contact us, or chat with our AI support.</p>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn" onClick={() => navigate("/projects")}>Explore Projects</button>
          <button className="btn" onClick={() => navigate("/contact")}>Contact Us</button>
          <button className="btn" onClick={() => document.getElementById("chatToggle")?.click()}>AI Support</button>
        </div>

        <div style={{ marginTop: 20 }}>
          Current time (UTC): <CurrentTime />
        </div>
      </section>

      <section id="services" className="main-section">
        <h2>Our Services</h2>
        <div className="flex" id="serviceList">
          <div className="card">Penetration Testing</div>
          <div className="card">Cyber Awareness Trainings</div>
          <div className="card">Web Security & Audits</div>
          <div className="card">Digital Forensics</div>
          <div className="card">Secure App Development</div>
          <div className="card">Cloud Security Auditing</div>
        </div>
      </section>
    </>
  );
}
