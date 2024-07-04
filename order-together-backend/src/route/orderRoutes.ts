import { Router } from 'express';
// import {getOrders, addOrder, orderController} from '../controller/orderController';
import {orderController} from "../controller/orderController";
import {authCheck} from "../controller/authMiddleware";

const router = Router();
const userAccess = [authCheck]

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);

// router.get('/orders', getOrders);
// router.post('/orders', addOrder);


router.get('/getInitiatorOrders', userAccess,orderController.getInitiatorOrders);
export default router;
