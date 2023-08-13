import { Modal } from "antd";
import DishForm from "../components/DishForm";

type Props = {
  modalAction: ModalAction;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  dish: Dish | null;
};

const DishModal: React.FC<Props> = props => {
  const { modalAction, isModalOpen, setIsModalOpen, dish } = props;

  // TODO Show Loading
  // TODO Handle dishError
  return (
    <Modal
      title={modalAction.modalTitle}
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
