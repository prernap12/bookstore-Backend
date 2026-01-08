import express from "express";
import {
  register,
  login,
  changePassword,
} from "../controller/authController.js";
import multer from "multer";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/changePassword", protect, changePassword);

export default router;
