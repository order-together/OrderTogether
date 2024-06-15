import { Router } from "express"
import UserController from "../controller/UserController";

const router = Router()

router.get('/check-username-existence',UserController.checkUsernameExistence)


router.post('/signup',UserController.signup)
router.post('/login',UserController.login)
export default router