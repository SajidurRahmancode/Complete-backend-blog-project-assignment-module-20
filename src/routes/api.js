import express from 'express';
import { verifyToken  } from './../middlewares/AuthVerification.js';
import { register,login,logout } from '../controllers/UserController.js';
import { createblog,readblog,editblog,deleteblog } from '../controllers/BlogController.js';

const router =express.Router();

router.use(express.json({ limit: "5mb" }));
router.use(express.urlencoded({ extended: true, limit: "5mb" }));




router.post("/register/",register);
router.post("/login/",login);
router.post("/logout/",logout);
router.post("/create-blog", verifyToken, createblog);
router.get("/read-blog", verifyToken, readblog);
router.put("/edit-blog", verifyToken, editblog);
router.delete("/delete-blog", verifyToken, deleteblog);

/* User Registration Api

User Login Api

Create blog api

Read all blog api

Edit blog api

Delete blog api */


export default router;