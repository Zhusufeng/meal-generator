import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import { transformMeals } from "../../../lib/mealHelpers";
import Dish from "../../../models/dish.model";
import User from "../../../models/user.model";
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
        const startDate = dayjs(date as string).startOf("day");
        const endDate = startDate.endOf("day");
        const result = await UserMeal.find({
          userId,
          mealDate: {
            $gte: startDate.toISOString(),
            $lt: endDate.toISOString(),
          },
        })
          .populate({
            path: "userId",
            model: User.modelName,
            select: "firstName",
          })
          .populate("mealType")
          .populate({
            path: "entrees",
            model: Dish.modelName,
            select: "name",
          });
        // TODO Transform data into what frontend needs
        const pracData = [
          {
            _id: "6598fb690c3b629da31a32fe",
            userId: {
              _id: "64d8535357bde9dc7ae69a18",
              firstName: "Lisa",
            },
            mealDate: "2024-01-06T06:54:25.895Z",
            mealType: {
              _id: "659793e54faff8b5b2de226a",
              type: "breakfast",
            },
            entrees: [
              {
                _id: "64d7ae7e611c0082d1339386",
                name: "Eggs, scrambled",
              },
            ],
            sides: [],
            createdAt: "2024-01-06T07:04:09.880Z",
            updatedAt: "2024-01-06T07:04:09.880Z",
            __v: 0,
          },
        ];
        transformMeals(pracData);
        // console.log("result", result);
        // const newResult = transformMeals(result);
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
