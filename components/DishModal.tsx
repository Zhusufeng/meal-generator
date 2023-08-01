import { Modal } from "antd";
import DishForm from "../components/DishForm";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const DishModal: React.FC<Props> = props => {
  const { isModalOpen, setIsModalOpen } = props;
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      footer={null}
      onCancel={() => setIsModalOpen(false)}
    >
      <DishForm setIsModalOpen={setIsModalOpen} />
    </Modal>
  );
};

export default DishModal;
