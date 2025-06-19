import { Router } from 'express';
import { getCurrentUser } from '../controllers/userController';

const router = Router();

router.get('/current-user', getCurrentUser);

export default router;
