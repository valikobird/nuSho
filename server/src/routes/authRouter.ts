import { Router } from 'express';
import { register } from '../controllers/authControllers';
import { validateRegisterInput } from '../middleware/validationMiddleware';

const router = Router();
router.post('/register', validateRegisterInput, register);

export default router;
