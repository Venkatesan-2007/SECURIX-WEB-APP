import React, { useState, useEffect } from "react";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("securix_services") || "[]");
    setServices(storedServices);
  }, []);

  return (
    <section className="main-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.length > 0 ? (
          services.map((service, index) => (
            <div key={index} className="service-card">
              {service.file && (
                <img 
                  src={service.file} 
                  alt={service.name} 
                  className="service-image"
                />
              )}
              <h3 className="service-name">{service.name}</h3>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
            <p>No services added yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
