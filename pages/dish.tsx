import { Button, Table, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import DishModal from "../components/DishModal";
import Layout from "../components/Layout";
import RecipeModal from "../components/RecipeModal";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Dish: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [dishId, setDishId] = useState(null);
  // TODO Refactor to pass down ADD or EDIT object

  const {
    data: dishes,
    error: dishesError,
    isLoading,
  } = useSWR("/api/dish", fetcher);

  const addDish = () => {
    setIsModalOpen(true);
    setModalAction("ADD");
  };

  const editDish = dishId => {
    setIsModalOpen(true);
    setModalAction("EDIT");
    setDishId(dishId);
  };

  const columns = [
    {
      title: "Dish Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Recipe",
      key: "recipe",
      dataIndex: "_id",
      render: id => <RecipeModal dishId={id} />,
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Button onClick={() => editDish(record._id)}>Edit Dish</Button>
      ),
    },
  ];

  // Only show max 1 GET /dish error
  const [dishAPI, dishContextHolder] = notification.useNotification({
    maxCount: 1,
  });

  if (dishesError) {
    dishAPI.error({
      message: "Error",
      description: dishesError.toString(),
    });
  }

  return (
    <Layout>
      {dishContextHolder}
      <DishModal
        modalAction={modalAction}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dishId={dishId}
      />
      <Button onClick={addDish}>Add Dish</Button>
      <Table
        rowKey="_id"
        dataSource={dishes?.data}
        columns={columns}
        loading={isLoading}
      />
    </Layout>
  );
};

export default Dish;
