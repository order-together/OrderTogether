import { Router } from 'express';
import { getOrders, addOrder } from '../controller/orderController';

const router = Router();

router.get('/orders', getOrders);
router.post('/orders', addOrder);

export default router;
