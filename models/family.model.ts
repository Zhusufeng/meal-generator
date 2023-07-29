import mongoose from "mongoose";
import User from "./user.model";

const FamilySchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName,
    },
  ],
});

export default mongoose.models.Family || mongoose.model("Family", FamilySchema);
