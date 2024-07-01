import {Router} from "express";
import ProductController from "../controller/ProductController";
import UserController from "../controller/UserController";


const router = Router()

router.post('/initiate',ProductController.createProduct)
router.get('/products', ProductController.getProducts);
<<<<<<< HEAD
router.get('/products/:id', ProductController.getProductByUid);
router.put('/products/:id', ProductController.updateProduct);
=======
router.get('/products/:uid', ProductController.getProductByUid);
router.put('/productsUpdate/:id', ProductController.updateProduct);
>>>>>>> f831ed679273405bb7951966510ee921ef4bf035
router.delete('/products/:id', ProductController.deleteProduct);

export default router
