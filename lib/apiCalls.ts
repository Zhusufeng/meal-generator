import axios from "axios";

export async function addDish(payload: DishPayload, dishId: null) {
  await axios.post("/api/dish", payload);
}

export async function editDish(payload: DishPayload, dishId: string) {
  await axios.put(`/api/dish/${dishId}`, payload);
}
