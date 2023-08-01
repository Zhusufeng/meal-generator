import { Button, Table, notification } from "antd";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import DishModal from "../components/DishModal";
import Layout from "../components/Layout";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Dish: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const {
    data: dishData,
    error: dishError,
    isLoading,
  } = useSWR("/api/dish", fetcher);
  console.log("dishData", dishData);

  const addDish = () => {
    setIsModalOpen(true);
    setModalAction("ADD");
  };

  const editDish = () => {
    setIsModalOpen(true);
    setModalAction("EDIT");
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
      render: (_, record) => <Button>View Recipe</Button>,
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => <Button onClick={editDish}>Edit Dish</Button>,
    },
  ];

  // Only show max 1 GET /dish error
  const [dishAPI, dishContextHolder] = notification.useNotification({
    maxCount: 1,
  });

  if (dishError) {
    dishAPI.error({
      message: "Error",
      description: dishError.toString(),
    });
  }

  return (
    <Layout>
      {dishContextHolder}
      <DishModal
        modalAction={modalAction}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Button onClick={addDish}>Add Dish</Button>
      <Table
        dataSource={dishData?.data}
        columns={columns}
        loading={isLoading}
      />
    </Layout>
  );
};

export default Dish;
