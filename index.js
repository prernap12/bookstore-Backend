// connect the database and then start the server

import mongoose from "mongoose";

import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🍏 database connected ");
    app.listen(PORT, () => console.log(` 🚀Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
