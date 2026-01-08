import express from "express";
import { createMessage, getMessage, deleteMessage } from "../controller/contactController.js";

const router = express.Router();

// POST route to submit message
router.post("/", createMessage);
router.get("/", getMessage);
router.delete("/:id", deleteMessage);

export default router;
