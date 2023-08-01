import { Button, Modal } from "antd";
import { useState } from "react";

type Props = {
  dishId: string;
};

const RecipeModal: React.FC<Props> = props => {
  const { dishId } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
    // Use dish ID to GET recipe
  };

  return (
    <div>
      <Button onClick={handleOpen}>View Recipe</Button>
      <Modal
        title="EDIT TITLE"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        Recipe here
      </Modal>
    </div>
  );
};

export default RecipeModal;
