import express from "express";
import { createBook, getBooks, getBookById, updateBook, deleteBook, getArrival} from "../controller/bookController.js";


const router = express.Router();

// CRUD routes
router.post("/", createBook);       // Create book
router.get("/", getBooks);          // Get all books
router.get("/arrival", getArrival);
router.get("/:id", getBookById);    // Get single book
router.put("/:id", updateBook);     // Update book
router.delete("/:id", deleteBook);  // Delete book



export default router;
