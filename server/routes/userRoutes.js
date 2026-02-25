import express from 'express'
import {  getUser, loginUser, registerUser,updateProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const userRouter=express.Router();
userRouter.post('/signup',registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/update-profile',protect,updateProfile)
userRouter.get('/check',protect,getUser)


export default userRouter;