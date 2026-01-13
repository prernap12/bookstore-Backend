import express from "express";

import dotenv from "dotenv";
import cors from "cors"; // <-- import cors
import bookRoutes from "./routes/bookRoute.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import contactRoutes from "./routes/contactRoute.js";

import cartRoute from "./routes/cartRoute.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// 👆 allows requests from your React app

// Serve static folder for images
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/addtocart", cartRoute);

// DB connection

export default app;
