import nodemailer from "nodemailer";
import Client from "../models/Client.js";

// Create transporter lazily - will be initialized on first use
let transporter = null;
let transporterInitialized = false;

const getTransporter = () => {
  if (!transporter && !transporterInitialized) {
    transporterInitialized = true;
    console.log("\n🔧 Initializing Email Transporter...");
    console.log("GMAIL_USER loaded:", process.env.GMAIL_USER);
    console.log("GMAIL_PASSWORD length:", process.env.GMAIL_PASSWORD ? process.env.GMAIL_PASSWORD.length : 0);
    console.log("OWNER_EMAIL loaded:", process.env.OWNER_EMAIL);

    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Verify SMTP connection
    transporter.verify((error, success) => {
      if (error) {
        console.error("❌ SMTP Connection Failed:", error.message);
      } else {
        console.log("✅ SMTP Connected Successfully!");
      }
    });
  }
  return transporter;
};

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Debug logging
    console.log("\n📧 Email Configuration:");
    console.log("GMAIL_USER:", process.env.GMAIL_USER ? "✅ Set" : "❌ MISSING");
    console.log("GMAIL_PASSWORD:", process.env.GMAIL_PASSWORD ? "✅ Set" : "❌ MISSING");
    console.log("OWNER_EMAIL:", process.env.OWNER_EMAIL ? "✅ Set" : "❌ MISSING");

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ error: "All fields are required" });
    }

    // Save client registration to database
    const newClient = new Client({
      name,
      email,
      phone,
      message,
    });

    await newClient.save();

    // Send email notification to owner
    if (process.env.GMAIL_USER && process.env.GMAIL_PASSWORD && process.env.OWNER_EMAIL) {
      try {
        const mailTransporter = getTransporter();
        const info = await mailTransporter.sendMail({
          from: process.env.GMAIL_USER,
          to: process.env.OWNER_EMAIL,
          subject: `🔔 New Client Registration - ${name}`,
          html: `
            <h2>New Client Registration</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr/>
            <p><em>Registered at: ${new Date().toLocaleString()}</em></p>
          `,
        });
        console.log("✅ Email sent successfully! ID:", info.messageId);
      } catch (emailError) {
        console.error("❌ Email notification failed:", emailError.message);
        console.error("Error details:", emailError);
        // Continue even if email fails - client registration is still saved
      }
    }

    return res.status(201).json({
      message: "Registration successful! We will contact you soon.",
      client: newClient,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return res
      .status(500)
      .json({ error: "Failed to submit registration", details: error.message });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    return res.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return res.status(500).json({ error: "Failed to fetch clients" });
  }
};
