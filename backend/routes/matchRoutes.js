import { Router } from 'express';
import { getMatchesController } from '../controllers/matchController.js';
import { protect } from '../authMiddleware.js';

const router = Router();

router.get('/', protect, getMatchesController);

export default router;
