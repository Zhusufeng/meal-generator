import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import UserMeal from "../../../models/userMeal.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  const { userId, date } = req.query;
  switch (method) {
    case "GET":
      try {
        // Get all of the user's meals for a date
        console.log("userId:", userId);
        console.log("date:", date);
        // store date as  YYYY-MM-DD
        const result = await UserMeal.find({ userId, mealDate: date });
        console.log("result", result);
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(400).json({
          success: false,
          errorMessage: String(error),
        });
      }
      break;
    case "POST":
      try {
        const { userId, mealDate, mealType, entrees, sides } = req.body;
        if (!userId || !mealDate || !mealType) {
          throw new Error("Insufficient data");
        }
        const userMeal = await UserMeal.create({
          userId,
          mealDate,
          mealType,
          entrees,
          sides,
          createdBy: userId,
          updatedBy: userId,
        });
        res.status(201).json({ success: true, data: userMeal });
      } catch (error) {
        res.status(400).json({
          success: false,
          errorMessage: String(error),
        });
      }
      break;
    default:
      const defaultErrorMessage = `Invalid method (${method}).`;
      res.status(400).json({
        success: false,
        errorMessage: defaultErrorMessage,
      });
      break;
  }
}