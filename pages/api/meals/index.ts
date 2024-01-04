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
        // Get a single meal (that is already created)
        const result = await UserMeal.find({ userId, mealDate: date });
        res.status(200).json({ success: true, data: result });
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
