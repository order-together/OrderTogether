import {Router} from "express";
import ProductController from "../controller/ProductController";
import UserController from "../controller/UserController";


const router = Router()

router.post('/initiate',ProductController.createProduct)
router.get('/products', ProductController.getProducts);
router.get('/products/:uid', ProductController.getProductByUid);
router.put('/productsUpdate/:id', ProductController.updateProduct);
router.put('/productsUpdateCurrentQuantity/:uid',ProductController.updateProductCurrentQuantity)
router.delete('/products/:id', ProductController.deleteProduct);

export default router
