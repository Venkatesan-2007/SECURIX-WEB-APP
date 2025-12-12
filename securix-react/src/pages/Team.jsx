import React from "react";

export default function Team() {
  return (
    <section className="main-section">
      <h2>Our Team</h2>
      <p>We are ethical hackers, developers and analysts shaping a secure world.</p>
      <div className="flex" style={{ justifyContent: "center", marginTop: 20 }}>
        <div className="team-card"><img src="https://i.ibb.co/Ng6hvKYF/founder.jpg" alt="Hajmal Irfan"/><h4>Hajmal Irfan</h4><small>Founder</small></div>
        <div className="team-card"><img src="https://i.ibb.co/0jpZKsWY/hari.jpg" alt="Hariharan J"/><h4>Hariharan J</h4><small>CEO</small></div>
        <div className="team-card"><img src="https://i.ibb.co/x8cx8LmV/venkatesh.jpg" alt="D. Venkatesan"/><h4>D. Venkatesan</h4><small>Senior Dev</small></div>
      </div>
    </section>
  );
}
