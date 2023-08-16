import { Modal } from "antd";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  dish: Dish | null;
};

const RecipeModal: React.FC<Props> = props => {
  const { isModalOpen, setIsModalOpen, dish } = props;

  return (
    <Modal
      title={`${dish.name} Recipe`}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
    >
      <div>
        {dish.recipe.link ? <a href="">`${dish.name} Recipe`</a> : null}
      </div>
      <div>{dish.recipe.ingredientsText}</div>
      <div>recipe here</div>
    </Modal>
  );
};

export default RecipeModal;
