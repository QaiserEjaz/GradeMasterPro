import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createCalculation, getCalculation, listCalculations } from '../controllers/calculationController.js';

const router = Router();

router.post('/', authenticateToken, createCalculation);

router.get('/', authenticateToken, listCalculations);

router.get('/:id', authenticateToken, getCalculation);

export default router;


