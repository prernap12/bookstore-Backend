import Book from "../models/bookModel.js";
import { uploadOnCloudinary } from "../helpers/uploads.js";
import fs from "fs";

import { BookRegister, UpdateBook } from "../dto/book.dto.js";
import mongoose from "mongoose";
import { da } from "zod/locales";

// Create a new book
export const createBook = async (req, res) => {
  try {
    // const { name, author, price, discount, description } = req.body;

    const data = BookRegister.safeParse(req.body);

    if (!data.success) {
      return res.status(402).json({ success: false, error: data.error.issues });
    }

    // Multer adds file info in req.file
    const image = req.file ? req.file.path : null;

    const imageUrl = await uploadOnCloudinary(image);

    const discountValue = parseFloat(data.data.discount);

    const book = new Book({
      name: data.data.name,
      author: data.data.author,
      price: data.data.price,
      discount: discountValue,
      description: data.data.description,
      image: imageUrl.secure_url, // store file name in DB
    });

    await book.save();
    res.status(201).json(book);
    // Source - https://stackoverflow.com/a
    // Posted by sourcecode, modified by community. See post 'Timeline' for change history
    // Retrieved 2025-12-17, License - CC BY-SA 3.0
    fs.unlinkSync(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a book
export const updateBook = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).json({
        success: false,
        error: "invalid book id ",
      });
    // const { name, author, price, discount, description } = req.body;

    const data = UpdateBook.safeParse(req.body);
    if (!data.success)
      return res.status(404).json({ success: false, error: data.error.issues });

    const updateData = {
      name: data.data.name,
      author: data.data.author,
      price: data.data.price,
      discount: data.data.discount,
      description: data.data.description,
    };

    // If a new image is uploaded, replace the old one
    if (req.file) {
      const imagePath = req.file.path;

      const URL = await uploadOnCloudinary(imagePath);
      updateData.image = URL.secure_url;
      console.log(updateData.image);
      fs.unlinkSync(imagePath);
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getArrival = async (req, res) => {
  try {
    const arrival = await Book.find().sort({ createdAt: -1 }).limit(6);
    res.status(201).json(arrival);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchBook = async (req, res) => {
  try {
    console.log("Hiii");
    const { book } = req.query;
    console.log(book);

    const searchbook = await Book.find({
      $or: [{ name: { $regex: book, $options: "i" } }],
    });
    res.status(200).json(searchbook);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// TODO:get  book according to the language
