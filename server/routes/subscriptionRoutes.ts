import { Router } from 'express';
import { subscribe, unsubscribe, confirmEmail } from '../controllers/subscriptionController';

const router = Router();

router.post('/', subscribe);
router.post('/unsubscribe', unsubscribe);
router.post('/confirm', confirmEmail);

export default router;
