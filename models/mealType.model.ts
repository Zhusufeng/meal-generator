import mongoose from "mongoose";

const MealTypeSchema = new mongoose.Schema({
  type: String,
});

MealTypeSchema.set("timestamps", true);

export default mongoose.models.MealType ||
  mongoose.model("MealType", MealTypeSchema);