import { Modal } from "antd";
import DishForm from "../components/DishForm";

type Props = {
  modalAction: ModalAction;
  isModalOpen: boolean;
  handleDishModal: (value: boolean) => void;
  dishId: string | null;
  userId: string;
};

const DishModal: React.FC<Props> = props => {
  const { modalAction, isModalOpen, handleDishModal, dishId, userId } = props;

  return (
    <Modal
      title={modalAction.modalTitle}
      open={isModalOpen}
      footer={null}
      onCancel={() => handleDishModal(false)}
    >
      <DishForm
        modalAction={modalAction}
        handleDishModal={handleDishModal}
        dishId={dishId}
        userId={userId}
      />
    </Modal>
  );
};

export default DishModal;
