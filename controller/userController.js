import User from "../models/userModel.js";
export const createUser = async (req, res) => {
  try {
    const {username, email, password,address,contact} = (req.body);
    const user= await User.create({username, email, password,address,contact});
    res.status(201).json(user);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};