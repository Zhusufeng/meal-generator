import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Dish from "../../../models/dish.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // TODO Create new API that finds dish by userId { createdBy: userId }
        const dishes = await Dish.find({}, ["name"]);
        res.status(200).json({ success: true, data: dishes });
      } catch (error) {
        res.status(400).json({
          success: false,
          errorMessage: String(error),
        });
      }
      break;
    case "POST":
      try {
        const { name, description, imageLink, type, recipe, userId } = req.body;
        const dish = await Dish.create({
          name,
          description,
          imageLink,
          type,
          recipe,
          createdBy: userId,
          updatedBy: userId,
        });
        res.status(201).json({ success: true, data: dish });
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
