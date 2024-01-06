import mongoose from "mongoose";
import Dish from "./dish.model";
import MealType from "./mealType.model";
import User from "./user.model";

const UserMealSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.modelName,
    },
    mealDate: Date,
    mealType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MealType.modelName,
    },
    entrees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Dish.modelName,
      },
    ],
    sides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Dish.modelName,
      },
    ],
  },
  { timestamps: true }
);

UserMealSchema.index({ mealDate: 1, userId: 1 });

export default mongoose.models.UserMeal ||
  mongoose.model("UserMeal", UserMealSchema);
