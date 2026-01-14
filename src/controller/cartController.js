// controllers/cartController.js
import Cart from "../models/cartModel.js";
import Book from "../models/bookModel.js";
import mongoose from "mongoose";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    const userId = req.user.id; // from auth middleware

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const existingItem = cart.items.find(
      (item) => item.book.toString() === bookId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ book: bookId, quantity: quantity || 1 });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.book");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
// export const removeFromCart = async (req, res) => {
//   try {
//     const { bookId } = req.body;
//     const userId = req.user.id;

//     const cart = await Cart.findOne({ user: userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const book=cart.items.find((item)=>item.book.toString()===bookId)

//     book.quantity - 1

//     // cart.items = cart.items.filter((item) => item.book.toString() !== bookId);

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(bookId))
      return res
        .status(402)
        .json({ success: false, error: "invalid booking id" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Book not found in cart" });
    }

    // If quantity > 1, decrement
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      // If quantity is 1, remove item completely
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
