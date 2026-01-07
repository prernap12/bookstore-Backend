// routes/cartRoutes.js
import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controller/cartController.js";
import { protect } from "../middleware/auth.middleware.js"; // make sure user is logged in

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/remove", protect, removeFromCart);

export default router;
