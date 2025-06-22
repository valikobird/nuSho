import { Router } from 'express';
import { login, logout, register } from '../controllers/authControllers';
import { validateLoginInput, validateRegisterInput } from '../middleware/validationMiddleware';

const router = Router();
router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

export default router;
