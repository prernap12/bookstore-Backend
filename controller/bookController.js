import Book from "../models/bookModel.js";

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { name, author, price, discount, description } = req.body;

    // Multer adds file info in req.file
    const image = req.file ? req.file.filename : null;

    const book = new Book({
      name,
      author,
      price,
      discount,
      description,
      image, // store file name in DB
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a book
export const updateBook = async (req, res) => {
  try {
    const { name, author, price, discount, description } = req.body;

    const updateData = {
      name,
      author,
      price,
      discount,
      description,
    };

    // If a new image is uploaded, replace the old one
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getArrival = async (req, res) => {
  try{
    const arrival = await Book.find().sort({ createdAt: -1 }).limit(2);
    res.status(201).json(arrival);
  }
  catch (err){
    res.status(400).json({ error: err.message });
  }
}

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
    const {book} = req.query
    console.log(book); 
    const searchbook  = await Book.find({
      $or: [
        { name: { $regex: book, $options: 'i' } },
      ],
    });
    res.status(200).json(searchbook);
  
    
  }
  catch (error){
    res.status(400).json({error});
  }
}
