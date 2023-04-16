import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a username"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    trim: true,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
