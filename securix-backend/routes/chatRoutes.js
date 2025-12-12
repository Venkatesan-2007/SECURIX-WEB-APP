import express from 'express';
import { chat } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/chat - Send message to Gemini
router.post('/', chat);

export default router;
