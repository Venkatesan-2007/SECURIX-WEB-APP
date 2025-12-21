import React, { useState, useEffect } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("securix_events") || "[]");
    setEvents(storedEvents);
  }, []);

  return (
    <section className="main-section">
      <h2>Events</h2>
      <div className="services-grid">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="service-card">
              {event.file && (
                <img 
                  src={event.file} 
                  alt={event.name} 
                  className="service-image"
                />
              )}
              <h3 className="service-name">{event.name}</h3>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
            <p>No events added yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
