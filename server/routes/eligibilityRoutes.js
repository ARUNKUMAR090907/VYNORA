import express from 'express';
import { getEligibleSchemes, getEligibilitySummary } from '../controllers/eligibilityController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/schemes', protect, getEligibleSchemes);
router.get('/summary', protect, getEligibilitySummary);

export default router;
