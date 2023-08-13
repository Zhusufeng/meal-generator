export const formatDishFieldsValue = dish => {
  // Dish Types
  const entree = dish?.type?.entree ? "entree" : null;
  const side = dish?.type?.side ? "side" : null;

  // Meal Types
  const breakfast = dish?.type?.breakfast ? "breakfast" : null;
  const lunch = dish?.type?.lunch ? "lunch" : null;
  const dinner = dish?.type?.dinner ? "dinner" : null;
  const snack = dish?.type?.snack ? "snack" : null;

  const recipeInstructions = dish?.recipe?.instructions.join("\n");

  const formattedDish = {
    name: dish?.name,
    description: dish?.description,
    imageLink: dish?.imageLink,
    dishType: [entree, side],
    mealType: [breakfast, lunch, dinner, snack],
    recipeLink: dish?.recipe?.link,
    recipeIngredients: dish?.recipe?.ingredientsText,
    recipeInstructions: recipeInstructions,
  };

  return formattedDish;
};
