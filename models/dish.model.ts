import mongoose from "mongoose";
import User from "./user.model";

const DishSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    imageLink: String,
    type: {
      entree: Boolean,
      side: Boolean,
      breakfast: Boolean,
      lunch: Boolean,
      dinner: Boolean,
      snack: Boolean,
    },
    recipe: {
      link: String,
      ingredientsText: String,
      instructions: [String],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName,
    },
  },
  { timestamps: true }
);

DishSchema.set("timestamps", true);

// Add an ascending index to the "name" field
DishSchema.index({ name: 1 });

export default mongoose.models.Dish || mongoose.model("Dish", DishSchema);
