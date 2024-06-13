import { Router } from 'express';
import { getProducts } from '../controller/productController';

const router = Router();

router.get('/products', getProducts);

export default router;