import {Router} from "express";
import ProductController from "../controller/ProductController";
import UserController from "../controller/UserController";


const router = Router()
router.post('/initiate',ProductController.createProduct)
export default router