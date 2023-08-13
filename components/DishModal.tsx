import { Modal } from "antd";
import axios from "axios";
import useSWR from "swr";
import DishForm from "../components/DishForm";

type Props = {
  modalAction: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  dishId: string | null;
};

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const DishModal: React.FC<Props> = props => {
  const { modalAction, isModalOpen, setIsModalOpen, dishId } = props;
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

  const {
    data: dishData,
    error: dishError,
    isLoading,
  } = useSWR(`/api/dish/${dishId}`, fetcher);
  console.log("dishData", dishData);

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
        dishId={dishId}
      />
    </Modal>
  );
};

export default DishModal;
