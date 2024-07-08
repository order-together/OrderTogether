import {Router} from "express";
import ProductController from "../controller/ProductController";
import UserController from "../controller/UserController";


const router = Router()

router.post('/initiate',ProductController.createProduct)
router.post('/safeDetect',ProductController.safeDetect)
router.get('/products', ProductController.getProducts);
router.get('/products/:uid', ProductController.getProductByUid);
router.put('/productsUpdate/:id', ProductController.updateProduct);
router.put('/updateProductStatus/:uid', ProductController.updateProductStatus);
router.put('/makePayment/:uid',ProductController.makePayment)
router.delete('/products/:id', ProductController.deleteProduct);

export default router
