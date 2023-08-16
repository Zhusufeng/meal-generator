import { Modal } from "antd";
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
          <h3>Link</h3>
          <div>
            <a href={dish.recipe.link}>{title} Link</a>
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
