import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);
export default User; // ✅ Correct way for ES modules

