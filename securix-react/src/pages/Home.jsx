import React from "react";
import { useNavigate } from "react-router-dom";
import CurrentTime from "../components/CurrentTime";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container" style={{ display: "flex", flexDirection: "column" }}>
      <div id="animated-bg">
        <div className="particle p1" />
        <div className="particle p2" />
        <div className="particle p3" />
        <div className="particle p4" />
        <div className="particle p5" />
      </div>

      <section id="hero" className="hero main-section" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "20px" }}>
        <h1>We Secure Your Smarter Future</h1>
        <p>Cybersecurity experts providing advanced protection and security audits for the next-gen innovators.</p>

        <div style={{ marginTop: 20 }}>
          Current time (UTC): <CurrentTime />
        </div>
      </section>
    </div>
  );
}
