import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST before anything else
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import aboutRoutes from "./routes/aboutRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/about", aboutRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Securix backend running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
