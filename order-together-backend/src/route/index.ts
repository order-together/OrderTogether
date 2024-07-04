import {Router} from "express";
import user from "./user";
import product from "./product";
import order from "./orderRoutes";
import rate from "./rateRoutes";

const routes = Router()

routes.use('/user',user)
routes.use('/product',product)
routes.use('/order',order)
routes.use('/rate',rate)

export default routes