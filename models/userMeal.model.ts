import mongoose from "mongoose";
import Dish from "./dish.model";
import User from "./user.model";

const UserMealSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User.modelName,
  },
  mealDate: Date,
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
});

UserMealSchema.index({ mealDate: 1, userId: 1 });

export default mongoose.models.UserMeal ||
  mongoose.model("UserMeal", UserMealSchema);
