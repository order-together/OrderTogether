import {Router} from "express";
import user from "./user";
import product from "./product";
import rate from "./rateRoutes";
import orderRoutes from "./orderRoutes";
import auth from "./auth";

const routes = Router()

routes.use('/user',user)
routes.use('/product',product)
routes.use('/rate',rate)
routes.use('/order',orderRoutes)
routes.use('/auth',auth)

export default routes