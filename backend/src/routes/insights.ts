import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { generateInsights, predictions } from '../controllers/insightsController.js';

const router = Router();

router.post('/generate', authenticateToken, generateInsights);

router.get('/predictions', authenticateToken, predictions);

export default router;


