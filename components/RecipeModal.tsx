import { Button, Modal } from "antd";
import RecipeInstructions from "./RecipeInstructions";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  dish: Dish | null;
};

const RecipeModal: React.FC<Props> = props => {
  const { isModalOpen, setIsModalOpen, dish } = props;

  const title = dish?.name ? `${dish.name} Recipe` : "Loading...";
  const ingredients = dish?.recipe?.ingredientsText || null;

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
    >
      {dish?.recipe?.link ? (
        <>
          <div>
            <Button
              type="link"
              href={dish.recipe.link}
              style={{ padding: 0 }}
              target="_blank"
              rel="noopener"
            >
              Link to Original Recipe
            </Button>
          </div>
        </>
      ) : null}

      <h3>Ingredients</h3>
      <div>{ingredients}</div>
      <h3>Instructions</h3>
      <div>
        <RecipeInstructions instructions={dish?.recipe?.instructions} />
      </div>
    </Modal>
  );
};

export default RecipeModal;
