import express from 'express'
import categoryRoutes from './CategoryRouter.js';
import ProductRouter from './ProductRouter.js';
import uploadrouter from './uploads.js';
import UserRouter from './UserRouter.js';


const routes = express.Router();

// localhost:3050/  location

routes.use("/user" , UserRouter)
routes.use("/api/category" , categoryRoutes)
routes.use("/api" , uploadrouter)
routes.use("/api/products" , ProductRouter)


export default routes;