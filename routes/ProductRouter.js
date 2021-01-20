import express from 'express'
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/productCtrl.js';

const ProductRouter = express.Router();

ProductRouter.get("/" , getProduct)
ProductRouter.post("/", createProduct)


ProductRouter.put("/:id" , updateProduct)
ProductRouter.delete("/:id" , deleteProduct)

export default ProductRouter;