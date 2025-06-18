import { Router } from 'express';
import { login, register } from '../controllers/authControllers';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware';

const router = Router();
router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

export default router;
