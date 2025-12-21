import React, { useState, useEffect } from "react";

const ADMIN_PASSWORD = "secur@x";

export default function Admin() {
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newService, setNewService] = useState("");
  const [newEvent, setNewEvent] = useState("");
  const [newTeamMember, setNewTeamMember] = useState("");
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    const storedAbout = localStorage.getItem("securix_about");
    const storedServices = JSON.parse(localStorage.getItem("securix_services") || "[]");
    const storedEvents = JSON.parse(localStorage.getItem("securix_events") || "[]");
    const storedTeam = JSON.parse(localStorage.getItem("securix_team") || "[]");
    const storedProjects = JSON.parse(localStorage.getItem("securix_projects") || "[]");
    if (storedAbout) setAboutContent(storedAbout);
    if (storedServices.length) setServices(storedServices);
    if (storedEvents.length) setEvents(storedEvents);
    if (storedTeam.length) setTeam(storedTeam);
    if (storedProjects.length) setProjects(storedProjects);
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

  // Services Functions
  function addService() {
    if (!newService.trim()) return;
    const updated = [...services, { id: Date.now(), name: newService.trim(), file: null }];
    setServices(updated);
    localStorage.setItem("securix_services", JSON.stringify(updated));
    setNewService("");
    alert("New Service added!");
  }

  function handleServiceFile(index, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...services];
      updated[index].file = e.target.result;
      setServices(updated);
      localStorage.setItem("securix_services", JSON.stringify(updated));
      alert("File added to service!");
    };
    reader.readAsDataURL(file);
  }

  function deleteService(index) {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
    localStorage.setItem("securix_services", JSON.stringify(updated));
  }

  // Events Functions
  function addEvent() {
    if (!newEvent.trim()) return;
    const updated = [...events, { id: Date.now(), name: newEvent.trim(), file: null }];
    setEvents(updated);
    localStorage.setItem("securix_events", JSON.stringify(updated));
    setNewEvent("");
    alert("New Event added!");
  }

  function handleEventFile(index, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...events];
      updated[index].file = e.target.result;
      setEvents(updated);
      localStorage.setItem("securix_events", JSON.stringify(updated));
      alert("File added to event!");
    };
    reader.readAsDataURL(file);
  }

  function deleteEvent(index) {
    const updated = events.filter((_, i) => i !== index);
    setEvents(updated);
    localStorage.setItem("securix_events", JSON.stringify(updated));
  }

  // Team Functions
  function addTeamMember() {
    if (!newTeamMember.trim()) return;
    const updated = [...team, { id: Date.now(), name: newTeamMember.trim(), file: null }];
    setTeam(updated);
    localStorage.setItem("securix_team", JSON.stringify(updated));
    setNewTeamMember("");
    alert("New Team member added!");
  }

  function handleTeamFile(index, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...team];
      updated[index].file = e.target.result;
      setTeam(updated);
      localStorage.setItem("securix_team", JSON.stringify(updated));
      alert("File added to team member!");
    };
    reader.readAsDataURL(file);
  }

  function deleteTeamMember(index) {
    const updated = team.filter((_, i) => i !== index);
    setTeam(updated);
    localStorage.setItem("securix_team", JSON.stringify(updated));
  }

  // Projects Functions
  function addProject() {
    if (!newProject.trim()) return;
    const updated = [...projects, { id: Date.now(), name: newProject.trim(), file: null }];
    setProjects(updated);
    localStorage.setItem("securix_projects", JSON.stringify(updated));
    setNewProject("");
    alert("New Project added!");
  }

  function handleProjectFile(index, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...projects];
      updated[index].file = e.target.result;
      setProjects(updated);
      localStorage.setItem("securix_projects", JSON.stringify(updated));
      alert("File added to project!");
    };
    reader.readAsDataURL(file);
  }

  function deleteProject(index) {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    localStorage.setItem("securix_projects", JSON.stringify(updated));
  }

  function logout() {
    setIsLogged(false);
    setPassword("");
    alert("Logged out successfully!");
  }

  if (!isLogged) {
    return (
      <section className="main-section">
        <h2>Admin Verification</h2>
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
      <h2>Admin Panel - Content Management</h2>

      <div className="admin-item">
        <label>About Content:</label>
        <textarea value={aboutContent} onChange={e=>setAboutContent(e.target.value)}></textarea>
        <button className="btn" onClick={saveAbout}>Save About</button>
      </div>

      {/* Services */}
      <div className="admin-item">
        <h3>Services Management</h3>
        <div style={{ marginBottom: 15 }}>
          <input type="text" value={newService} onChange={e=>setNewService(e.target.value)} placeholder="Add new service" style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 5, border: "1px solid var(--digital-blue)", background: "#0d121d", color: "var(--text-white)" }} />
          <button className="btn" onClick={addService}>Add Service</button>
        </div>
        <div className="flex" style={{ marginTop: 15, gap: 15 }}>
          {services.map((s, i) => (
            <div key={i} className="card" style={{ flex: "1 1 250px", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 15 }}>
              <div>
                {s.file && <img src={s.file} alt={s.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 5, marginBottom: 10 }} />}
                <p style={{ margin: 0, color: "var(--digital-blue)", fontWeight: "bold", wordBreak: "break-word" }}>{s.name}</p>
              </div>
              <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                <label style={{ flex: 1, background: "var(--digital-blue)", color: "#000", padding: "8px", borderRadius: 3, cursor: "pointer", textAlign: "center", fontWeight: "bold", fontSize: "0.85rem" }}>
                  Add File
                  <input type="file" onChange={(e) => handleServiceFile(i, e.target.files[0])} style={{ display: "none" }} accept="image/*" />
                </label>
                <button onClick={() => deleteService(i)} style={{ background: "#ff0077", color: "#fff", border: "none", padding: "8px 10px", borderRadius: 3, cursor: "pointer", fontWeight: "bold" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="admin-item">
        <h3>Events Management</h3>
        <div style={{ marginBottom: 15 }}>
          <input type="text" value={newEvent} onChange={e=>setNewEvent(e.target.value)} placeholder="Add new event" style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 5, border: "1px solid var(--digital-blue)", background: "#0d121d", color: "var(--text-white)" }} />
          <button className="btn" onClick={addEvent}>Add Event</button>
        </div>
        <div className="flex" style={{ marginTop: 15, gap: 15 }}>
          {events.map((e, i) => (
            <div key={i} className="card" style={{ flex: "1 1 250px", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 15 }}>
              <div>
                {e.file && <img src={e.file} alt={e.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 5, marginBottom: 10 }} />}
                <p style={{ margin: 0, color: "var(--digital-blue)", fontWeight: "bold", wordBreak: "break-word" }}>{e.name}</p>
              </div>
              <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                <label style={{ flex: 1, background: "var(--digital-blue)", color: "#000", padding: "8px", borderRadius: 3, cursor: "pointer", textAlign: "center", fontWeight: "bold", fontSize: "0.85rem" }}>
                  Add File
                  <input type="file" onChange={(e2) => handleEventFile(i, e2.target.files[0])} style={{ display: "none" }} accept="image/*" />
                </label>
                <button onClick={() => deleteEvent(i)} style={{ background: "#ff0077", color: "#fff", border: "none", padding: "8px 10px", borderRadius: 3, cursor: "pointer", fontWeight: "bold" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="admin-item">
        <h3>Team Management</h3>
        <div style={{ marginBottom: 15 }}>
          <input type="text" value={newTeamMember} onChange={e=>setNewTeamMember(e.target.value)} placeholder="Add team member name" style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 5, border: "1px solid var(--digital-blue)", background: "#0d121d", color: "var(--text-white)" }} />
          <button className="btn" onClick={addTeamMember}>Add Team Member</button>
        </div>
        <div className="flex" style={{ marginTop: 15, gap: 15 }}>
          {team.map((member, i) => (
            <div key={i} className="card" style={{ flex: "1 1 250px", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 15 }}>
              <div>
                {member.file && <img src={member.file} alt={member.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 5, marginBottom: 10 }} />}
                <p style={{ margin: 0, color: "var(--digital-blue)", fontWeight: "bold", wordBreak: "break-word" }}>{member.name}</p>
              </div>
              <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                <label style={{ flex: 1, background: "var(--digital-blue)", color: "#000", padding: "8px", borderRadius: 3, cursor: "pointer", textAlign: "center", fontWeight: "bold", fontSize: "0.85rem" }}>
                  Add File
                  <input type="file" onChange={(e) => handleTeamFile(i, e.target.files[0])} style={{ display: "none" }} accept="image/*" />
                </label>
                <button onClick={() => deleteTeamMember(i)} style={{ background: "#ff0077", color: "#fff", border: "none", padding: "8px 10px", borderRadius: 3, cursor: "pointer", fontWeight: "bold" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="admin-item">
        <h3>Projects Management</h3>
        <div style={{ marginBottom: 15 }}>
          <input type="text" value={newProject} onChange={e=>setNewProject(e.target.value)} placeholder="Add new project" style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 5, border: "1px solid var(--digital-blue)", background: "#0d121d", color: "var(--text-white)" }} />
          <button className="btn" onClick={addProject}>Add Project</button>
        </div>
        <div className="flex" style={{ marginTop: 15, gap: 15 }}>
          {projects.map((p, i) => (
            <div key={i} className="card" style={{ flex: "1 1 250px", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 15 }}>
              <div>
                {p.file && <img src={p.file} alt={p.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 5, marginBottom: 10 }} />}
                <p style={{ margin: 0, color: "var(--digital-blue)", fontWeight: "bold", wordBreak: "break-word" }}>{p.name}</p>
              </div>
              <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                <label style={{ flex: 1, background: "var(--digital-blue)", color: "#000", padding: "8px", borderRadius: 3, cursor: "pointer", textAlign: "center", fontWeight: "bold", fontSize: "0.85rem" }}>
                  Add File
                  <input type="file" onChange={(e) => handleProjectFile(i, e.target.files[0])} style={{ display: "none" }} accept="image/*" />
                </label>
                <button onClick={() => deleteProject(i)} style={{ background: "#ff0077", color: "#fff", border: "none", padding: "8px 10px", borderRadius: 3, cursor: "pointer", fontWeight: "bold" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn logout-btn" onClick={logout}>Logout</button>
    </section>
  );
}
