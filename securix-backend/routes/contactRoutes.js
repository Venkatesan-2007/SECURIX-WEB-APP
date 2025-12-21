import express from "express";
import { submitContact, getAllClients } from "../controllers/contactController.js";

const router = express.Router();

// Client registration
router.post("/submit", submitContact);

// Get all clients (you can add auth middleware if needed)
router.get("/all", getAllClients);

export default router;
