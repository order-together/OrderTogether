import {Router} from "express";
import user from "./user";
import product from "./product";
import orderRoutes from "./orderRoutes";

const routes = Router()

routes.use('/user',user)
routes.use('/product',product)
routes.use('/order',orderRoutes)

export default routes