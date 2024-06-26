import {Router} from "express";
import ProductController from "../controller/ProductController";
import UserController from "../controller/UserController";


const router = Router()

router.post('/initiate',ProductController.createProduct)
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProductById);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

export default router
