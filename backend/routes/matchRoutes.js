import { Router } from 'express';
import { getMatches } from '../controllers/matchController.js';

const router = Router();

router.get('/', getMatches);

export default router;
