import express from 'express';
import { verifyToken  } from './../middlewares/AuthVerification.js';
import { register } from '../controllers/UserController.js';
import { login } from '../controllers/UserController.js';
import { createblog } from '../controllers/UserController.js';

const router =express.Router();
router.use(express.json()); 





router.post("/register/",register);
router.post("/login/",login);
router.post("/create-blog/",verifyToken,createblog);


/* User Registration Api

User Login Api

Create blog api

Read all blog api

Edit blog api

Delete blog api */


export default router;