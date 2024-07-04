import { Router } from 'express';
// import {getOrders, addOrder, orderController} from '../controller/orderController';
import {orderController} from "../controller/orderController";

const router = Router();

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);

// router.get('/orders', getOrders);
// router.post('/orders', addOrder);


router.get('/getInitiatorOrders', orderController.getInitiatorOrders);
export default router;
