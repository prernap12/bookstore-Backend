import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, // store image URL or file path
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0, // percentage discount
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      enum: ["NEPALI", "ENGLISH"],
      default: "NEPALI",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
