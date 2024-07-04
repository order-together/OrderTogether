import {Router} from "express";
import {authCheck} from "../controller/authMiddleware";


const router = Router()

router.get('/authCheck',authCheck)


export default router