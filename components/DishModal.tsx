import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import DishForm from "../components/DishForm";

type Props = {
  modalAction: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  dishId: string | null;
};

const DishModal: React.FC<Props> = props => {
  const { modalAction, isModalOpen, setIsModalOpen, dishId } = props;
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const getDish = async () => {
      const result = await axios.get(`/api/dish/${dishId}`);
      setDish(result.data.data);
    };

    // TODO handle error
    if (modalAction === "EDIT" && dishId) {
      getDish().catch(error => console.log(error));
    }
  }, [dishId, modalAction, isModalOpen]);

  let modalTitle = "";
  switch (modalAction) {
    case "ADD":
      modalTitle = "Add Dish";
      break;
    case "EDIT":
      modalTitle = "Edit Dish";
    default:
      modalTitle = null;
  }

  // TODO Show Loading
  // TODO Handle dishError
  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      footer={null}
      onCancel={() => setIsModalOpen(false)}
    >
      <DishForm
        modalAction={modalAction}
        setIsModalOpen={setIsModalOpen}
        dish={dish}
      />
    </Modal>
  );
};

export default DishModal;
