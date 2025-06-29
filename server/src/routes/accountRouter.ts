import { Router } from 'express';
import { createAccount, getEnabledAccounts, getNotLinkedAccounts } from '../controllers/accountController';
import { validateCreateAccountInput } from '../middleware/validationMiddleware';

const router = Router();

router.route('/').get(getEnabledAccounts).post(validateCreateAccountInput, createAccount);
router.route('/not-linked').get(getNotLinkedAccounts);

export default router;
