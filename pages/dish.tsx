import { Button, Table, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DishModal from "../components/DishModal";
import Layout from "../components/Layout";
import RecipeModal from "../components/RecipeModal";
import { ADD, EDIT } from "../lib/dishHelpers";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Dish: React.FC = () => {
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [dishId, setDishId] = useState(null);
  const [dish, setDish] = useState(null);
  const [modalAction, setModalAction] = useState(ADD);

  useEffect(() => {
    const getDish = async () => {
      const result = await axios.get(`/api/dish/${dishId}`);
      setDish(result.data.data);
    };

    // TODO handle error
    if (modalAction.action === "EDIT" && dishId) {
      getDish().catch(error => console.log(error));
    }
    return () => {
      setDish(null);
    };
  }, [dishId, modalAction]);

  const {
    data: dishes,
    error: dishesError,
    isLoading,
  } = useSWR("/api/dish", fetcher);
  console.log(dishes);

  const addDish = () => {
    setIsDishModalOpen(true);
    setModalAction(ADD);
    setDishId(null);
  };

  const editDish = (dishId: string) => {
    setIsDishModalOpen(true);
    setModalAction(EDIT);
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
      render: (dishId: string, record: Dish) => {
        setDishId(dishId);
        return <RecipeModal dish={dish} />;
      },
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record: Dish) => (
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
        isModalOpen={isDishModalOpen}
        setIsModalOpen={setIsDishModalOpen}
        dish={dish}
      />
      <RecipeModal dish={dish} />
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
