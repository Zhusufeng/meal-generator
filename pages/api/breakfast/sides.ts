import { BREAKFAST_SIDES } from "../data/food";

// TODO This would grab from a database
export default function handler(req, res) {
  res.status(200).json(BREAKFAST_SIDES);
}
