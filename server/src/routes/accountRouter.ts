import { Router } from 'express';
import {
  createAccount,
  getEnabledAccounts,
} from '../controllers/accountController';
import { validateCreateAccountInput } from '../middleware/validationMiddleware';

const router = Router();

router
  .route('/')
  .get(getEnabledAccounts)
  .post(validateCreateAccountInput, createAccount);

export default router;
