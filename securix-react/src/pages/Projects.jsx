import React, { useState, useEffect } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("securix_projects") || "[]");
    setProjects(storedProjects);
  }, []);

  return (
    <section className="main-section">
      <h2>Completed Projects</h2>
      <div className="services-grid">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="service-card">
              {project.file && (
                <img 
                  src={project.file} 
                  alt={project.name} 
                  className="service-image"
                />
              )}
              <h3 className="service-name">{project.name}</h3>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
            <p>No projects added yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
