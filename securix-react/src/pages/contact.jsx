import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="main-section">
      <h2>Let's Talk</h2>
      <p>Email: care.securix@gmail.com</p>
      <p style={{ marginTop: 10 }}>Connect with Securix Service through our official platforms:</p>
      <div className="contact-links" style={{ marginTop: 20 }}>
        <a href="https://www.instagram.com/_securix_" target="_blank" rel="noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram"/></a>
        <a href="https://wa.me/917010000000?text=Hello%20Securix%20Service" target="_blank" rel="noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp"/></a>
        <a href="https://www.linkedin.com/company/securix-service/about/" target="_blank" rel="noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt="LinkedIn"/></a>
      </div>
    </section>
  );
}
