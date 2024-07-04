import { Router } from 'express';
import OrderController from '../controller/orderController';

const router = Router();

router.post('/orders', OrderController.createOrder);
router.get('/orders', OrderController.getAllOrders);

export default router;
