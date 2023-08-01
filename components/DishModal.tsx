import { Modal } from "antd";
import DishForm from "../components/DishForm";

const DishModal = props => {
  const { isModalOpen, closeModal } = props;
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      footer={null}
      onCancel={closeModal}
    >
      <DishForm />
    </Modal>
  );
};

export default DishModal;
