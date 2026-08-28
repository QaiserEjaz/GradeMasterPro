import { Router } from 'express';
import { convertGrade, getSystems } from '../controllers/gradingSystemsController.js';

const router = Router();

router.get('/', getSystems);
router.get('/:to/convert', convertGrade);

export default router;
