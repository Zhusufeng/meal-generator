type Dish = {
  _id: string;
  name: string;
  description: string | null;
  imageLink: string | null;
  type: {
    entree: boolean;
    side: boolean;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    snack: boolean;
  };
  recipe: {
    link: string | null;
    ingredientsText: string | null;
    instructions: string[] | null;
  };
  createdBy: string;
  updatedBy: string;
};

type DishPayload = Pick<
  Dish,
  "name" | "description" | "imageLink" | "type" | "recipe"
> & { userId: string };

type ModalAction = {
  action: string;
  modalTitle: string;
  api: (payload: DishPayload, dishId: string | null) => Promise<void>;
};

type Session = {
  expires: Date;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
};
