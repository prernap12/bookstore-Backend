import express from "express";
import { register, login } from "../controller/authController.js";
import multer from "multer";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);



export default router;
