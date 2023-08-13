import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Dish from "../../../models/dish.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();
  const { id } = req.query;
  switch (method) {
    case "GET":
      try {
        const dish = await Dish.findById(id);
        res.status(200).json({ success: true, data: dish });
      } catch (error) {
        res.status(400).json({
          success: false,
          errorMessage: String(error),
        });
      }
      break;
    case "PUT":
      try {
        const { name, description, imageLink, type, recipe, userId } = req.body;
        // TODO Process recipe correctly
        const dish = await Dish.updateOne(
          {
            _id: id,
          },
          {
            name,
            description,
            imageLink,
            type,
            recipe,
            updatedBy: userId,
          }
        );
        res.status(200).json({ success: true, data: dish });
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
