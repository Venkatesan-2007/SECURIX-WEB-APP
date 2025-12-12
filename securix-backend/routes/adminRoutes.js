import express from "express";
import { login, me } from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, me);

export default router;
