import {Router} from "express";
import user from "./user";
import product from "./product";

const routes = Router()

routes.use('/user',user)
routes.use('/product', product)

export default routes