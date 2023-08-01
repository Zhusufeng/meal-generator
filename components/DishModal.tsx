import { Modal } from "antd";
import DishForm from "../components/DishForm";

type Props = {
  modalTitle: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const DishModal: React.FC<Props> = props => {
  const { modalTitle, isModalOpen, setIsModalOpen } = props;

  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      footer={null}
      onCancel={() => setIsModalOpen(false)}
    >
      <DishForm setIsModalOpen={setIsModalOpen} />
    </Modal>
  );
};

export default DishModal;
