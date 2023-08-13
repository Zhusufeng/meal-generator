import { USER_ID } from "./constants";

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

export const transformPayload = values => {
  const dishType = values.dishType.reduce((acc, type) => {
    return { ...acc, [type]: true };
  }, {});
  const mealType = values.mealType.reduce((acc, type) => {
    return { ...acc, [type]: true };
  }, {});
  const recipeInstructions = values?.recipeInstructions?.split("\n");
  const payload = {
    userId: USER_ID,
    name: values.name,
    imageLink: values.imageLink,
    description: values.description,
    type: { ...dishType, ...mealType },
    recipe: {
      link: values.recipeLink,
      ingredientsText: values.recipeIngredients,
      instructions: recipeInstructions,
    },
  };
  return payload;
};
