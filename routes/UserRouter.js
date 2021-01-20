import express from 'express'
import { getUser, Login, Logout, refreshToken, Register } from '../controllers/userCtrl.js';
import { Auth } from '../middleware/auth.js';

const UserRouter = express.Router()

// localhost:3050/user  location

UserRouter.post("/register" , Register)

UserRouter.get("/login" , Login)
UserRouter.get("/logout" , Logout)

// middleware
UserRouter.get("/infor" , Auth , getUser)


UserRouter.get("/refresh_token" , refreshToken)

export default UserRouter;