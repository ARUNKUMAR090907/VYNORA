import express from 'express';
import { getAllSchemes, getSchemeById, searchSchemes, getSchemesByCategory } from '../controllers/schemeController.js';

const router = express.Router();

router.get('/', getAllSchemes);
router.get('/search', searchSchemes);
router.get('/category/:category', getSchemesByCategory);
router.get('/:id', getSchemeById);

export default router;
