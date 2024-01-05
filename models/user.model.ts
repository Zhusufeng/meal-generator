import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  color: String,
});

UserSchema.set("timestamps", true);

export default mongoose.models.User || mongoose.model("User", UserSchema);
