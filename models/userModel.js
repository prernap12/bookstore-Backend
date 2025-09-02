import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String, 
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

/**
 * Pre-save hook to hash the password before saving
 */
userSchema.pre("save", async function (next) {
  // only hash if the password field is modified (new or changed)
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // generate salt
    this.password = await bcrypt.hash(this.password, salt); // hash password
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Method to compare entered password with hashed one
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
