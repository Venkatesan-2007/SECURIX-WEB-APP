import React, { useState, useEffect } from "react";

const ADMIN_PASSWORD = "hajmal2007"; // keep for parity; move to server in production

export default function Admin() {
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [newService, setNewService] = useState("");
  const [newEvent, setNewEvent] = useState("");

  useEffect(() => {
    const storedAbout = localStorage.getItem("securix_about");
    const storedServices = JSON.parse(localStorage.getItem("securix_services") || "[]");
    const storedEvents = JSON.parse(localStorage.getItem("securix_events") || "[]");
    if (storedAbout) setAboutContent(storedAbout);
    if (storedServices.length) setServices(storedServices);
    if (storedEvents.length) setEvents(storedEvents);
  }, []);

  function login(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLogged(true);
      alert("Login successful!");
    } else {
      alert("ACCESS DENIED ❌");
    }
  }

  function saveAbout() {
    localStorage.setItem("securix_about", aboutContent);
    alert("About content updated!");
  }

  function addService() {
    if (!newService.trim()) return;
    const updated = [...services, newService.trim()];
    setServices(updated);
    localStorage.setItem("securix_services", JSON.stringify(updated));
    setNewService("");
    alert("New Service added!");
  }

  function addEvent() {
    if (!newEvent.trim()) return;
    const updated = [...events, newEvent.trim()];
    setEvents(updated);
    localStorage.setItem("securix_events", JSON.stringify(updated));
    setNewEvent("");
    alert("New Event added!");
  }

  function logout() {
    setIsLogged(false);
    setPassword("");
    alert("Logged out successfully!");
  }

  if (!isLogged) {
    return (
      <section className="main-section">
        <h2>Admin Login</h2>
        <form onSubmit={login} className="loginBox" style={{ maxWidth: 400 }}>
          <h3>Admin Login</h3>
          <input type="password" id="adminPassword" placeholder="Enter Password" value={password} onChange={e=>setPassword(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 12, background: "#0d121d", color: "var(--text-white)", border: "1px solid var(--digital-blue)" }} />
          <button className="btn" type="submit">Login</button>
        </form>
      </section>
    );
  }

  return (
    <section id="adminPanel" className="main-section open">
      <h2>Admin Panel</h2>

      <div className="admin-item">
        <label>About Content:</label>
        <textarea value={aboutContent} onChange={e=>setAboutContent(e.target.value)}></textarea>
        <button className="btn" onClick={saveAbout}>Save About</button>
      </div>

      <div className="admin-item">
        <label>Add Service (e.g., Blockchain Security):</label>
        <textarea value={newService} onChange={e=>setNewService(e.target.value)}></textarea>
        <button className="btn" onClick={addService}>Add Service</button>

        <div style={{ marginTop: 12 }}>
          <h4 style={{ color: "var(--digital-blue)" }}>Existing Services</h4>
          <div className="flex" style={{ marginTop: 8 }}>
            {services.map((s, i)=> <div className="card" key={i}>{s}</div>)}
          </div>
        </div>
      </div>

      <div className="admin-item">
        <label>Add Event (e.g., Cyber Summit - 10 Dec):</label>
        <textarea value={newEvent} onChange={e=>setNewEvent(e.target.value)}></textarea>
        <button className="btn" onClick={addEvent}>Add Event</button>

        <div style={{ marginTop: 12 }}>
          <h4 style={{ color: "var(--digital-blue)" }}>Existing Events</h4>
          <div className="flex" style={{ marginTop: 8 }}>
            {events.map((e, i)=> <div className="card" key={i}>{e}</div>)}
          </div>
        </div>
      </div>

      <button className="btn logout-btn" onClick={logout}>Logout</button>
    </section>
  );
}
