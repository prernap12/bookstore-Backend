import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getArrival,
  searchBook,
} from "../controller/bookController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Create book with image upload
router.post("/", upload.single("image"), createBook);
router.get("/search", searchBook);
// Update book with optional new image j4rnflkenrfkjwek;fj
router.patch("/:id", upload.single("image"), updateBook);

router.get("/", getBooks);
router.get("/arrival", getArrival);
router.get("/:id", getBookById);
router.delete("/:id", deleteBook);


export default router;
