import { Router } from "express"
import UserController from "../controller/UserController";
import userController from "../controller/UserController";

const router = Router()

router.get('/check-username-existence',UserController.checkUsernameExistence)
router.get('/userInfo/:uid',userController.getUserByUid)

router.post('/signup',UserController.signup)
router.post('/login',UserController.login)

router.put('/update', UserController.updateUserInfo);

export default router