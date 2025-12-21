import React, { useState, useEffect } from "react";

export default function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const storedTeam = JSON.parse(localStorage.getItem("securix_team") || "[]");
    setTeam(storedTeam);
  }, []);

  return (
    <section className="main-section">
      <h2>Our Team</h2>
      <p>We are ethical hackers, developers and analysts shaping a secure world.</p>
      <div className="services-grid">
        {team.length > 0 ? (
          team.map((member, index) => (
            <div key={index} className="team-card">
              {member.file && (
                <img 
                  src={member.file} 
                  alt={member.name} 
                  className="team-photo"
                />
              )}
              <h3 className="service-name">{member.name}</h3>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
            <p>No team members added yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
