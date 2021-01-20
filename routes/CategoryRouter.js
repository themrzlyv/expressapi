import express from 'express'
import { getCategory , createCategory, deleteCategory , updateCategory} from '../controllers/categoryCtrl.js';
import {Auth} from '../middleware/auth.js'
import {authAdmin} from '../middleware/authAdmin.js'

const categoryRoutes = express.Router();

categoryRoutes.get("/" , getCategory)
categoryRoutes.post("/" , Auth, authAdmin, createCategory)
categoryRoutes.delete("/:id" , Auth, authAdmin, deleteCategory)
categoryRoutes.put("/:id" , Auth, authAdmin, updateCategory)

export default categoryRoutes;