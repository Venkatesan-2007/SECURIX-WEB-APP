import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse({
          type: "success",
          message: data.message || "Registration successful! We will contact you soon.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setResponse({
          type: "error",
          message: data.error || "Failed to submit registration",
        });
      }
    } catch (error) {
      setResponse({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="main-section">
      <h2>Get in Touch</h2>
      <p>Register with us and we'll contact you soon!</p>

      <div className="contact-container" style={{ marginTop: 30, maxWidth: 500, margin: "30px auto" }}>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+91 1234567890"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us about your requirements..."
              rows="5"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Submitting..." : "Register Now"}
          </button>
        </form>

        {response && (
          <div className={`response-message ${response.type}`} style={{ marginTop: 20 }}>
            {response.message}
          </div>
        )}
      </div>

      <hr style={{ margin: "40px 0" }} />

      <p style={{ marginTop: 20, marginBottom: 10 }}>Or connect with us through:</p>
      <p>Email: care.securix@gmail.com</p>

      <div className="contact-links" style={{ marginTop: 20 }}>
        <a href="https://www.instagram.com/_securix_" target="_blank" rel="noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
        </a>
        <a href="https://wa.me/917010000000?text=Hello%20Securix%20Service" target="_blank" rel="noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" />
        </a>
        <a href="https://www.linkedin.com/company/securix-service/about/" target="_blank" rel="noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt="LinkedIn" />
        </a>
      </div>
    </section>
  );
}
