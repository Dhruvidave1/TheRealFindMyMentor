import { Router } from 'express';
import {
	getUsers,
	createUser,
	updateUser,
	authUser,
} from '../controllers/userController.js';
import { protect } from '../authMiddleware.js';
const router = Router();

router.get('/login', authUser);
router.get('/', protect, getUsers);
router.post('/', createUser);
router.put('/', protect, updateUser);
// router.delete('/',deleteUser);

export default router;
