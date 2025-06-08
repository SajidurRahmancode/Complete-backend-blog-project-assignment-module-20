import express from 'express';
import { AuthVerification } from './../middlewares/AuthVerification.js';
import { register, UserOtp } from '../controllers/UserController.js';

const router =express.Router();




router.get("/ProductBrandList/",ProductBrandList);

router.get("/Register/",register);

/* User Registration Api

User Login Api

Create blog api

Read all blog api

Edit blog api

Delete blog api */


export default router;