import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  color: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
