import { Modal } from "antd";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  dish: Dish | null;
};

const RecipeModal: React.FC<Props> = props => {
  const { isModalOpen, setIsModalOpen, dish } = props;

  const title = dish?.name ? `${dish.name} Recipe` : "Loading...";
  const link = dish?.recipe?.link ? (
    <a href={dish.recipe.link}>`${dish.name} Recipe`</a>
  ) : null;
  const ingredients = dish?.recipe?.ingredientsText || null;
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
    >
      <div>{link}</div>
      <div>{ingredients}</div>
      <div>recipe here</div>
    </Modal>
  );
};

export default RecipeModal;
