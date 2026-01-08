import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// ================== JWT Helper ==================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ================== REGISTER ==================
export const register = async (req, res) => {
  try {
    const { email, password, username, address, contact } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ❌ no manual hashing (use schema pre-save hook OR hash here if needed)
    const newUser = new User({
      email,
      password,
      username,
      address,
      contact,
    });

    // console.log("Saved user:", newUser);
    const returnUser = await newUser.save();

    const { password: _, ...userWithoutPassword } = returnUser.toObject();

    res.status(201).json({
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================== LOGIN ==================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare plain password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Success
    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id), // ✅ return token
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "user not found" });

    const comparePassword = await bcrypt.compare(oldPassword, user.password);

    if (!comparePassword)
      return res.status(400).json({ message: "invalid password" });

    user.password = newPassword;

    const data = await user.save();

    return res.status(200).json({ message: "password change successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
