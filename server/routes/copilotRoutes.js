import express from 'express';
import { askCopilot, chatWithCopilot, verifyLink, auditDocument } from '../controllers/copilotController.js';

const router = express.Router();

router.post('/ask', askCopilot);
router.post('/chat', chatWithCopilot);
router.post('/verify-link', verifyLink);
router.post('/audit-document', auditDocument);

export default router;

