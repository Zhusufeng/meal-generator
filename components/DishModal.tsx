import { Modal } from "antd";
import DishForm from "../components/DishForm";

type Props = {
  modalAction: ModalAction;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  dishId: string | null;
  session: UserSession;
};

const DishModal: React.FC<Props> = props => {
  const { modalAction, isModalOpen, setIsModalOpen, dishId, session } = props;

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
        dishId={dishId}
        session={session}
      />
    </Modal>
  );
};

export default DishModal;
