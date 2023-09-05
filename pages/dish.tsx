import { EditOutlined, ZoomInOutlined } from "@ant-design/icons";
import { Button, Space, Table, notification } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DishModal from "../components/DishModal";
import Layout from "../components/Layout";
import RecipeModal from "../components/RecipeModal";
import { ADD, EDIT } from "../lib/dishHelpers";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

// TODO Move to a component

const Dish: React.FC = () => {
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [dishId, setDishId] = useState(null);
  const [dish, setDish] = useState(null);
  const [modalAction, setModalAction] = useState(ADD);
  const { data: session } = useSession();

  useEffect(() => {
    const getDish = async (id: string) => {
      const result = await axios.get(`/api/dish/${id}`);
      setDish(result.data.data);
    };

    // TODO handle error
    if (dishId) {
      getDish(dishId).catch(error => console.log(error));
    } else {
      setDish(null);
    }
    return () => {
      setDish(null);
    };
  }, [dishId]);

  const {
    data: dishes,
    error: dishesError,
    isLoading,
  } = useSWR("/api/dish", fetcher);

  const addDish = () => {
    setDishId(null);
    setIsDishModalOpen(true);
    setModalAction(ADD);
  };

  const editDish = (dishId: string) => {
    setDishId(dishId);
    setIsDishModalOpen(true);
    setModalAction(EDIT);
  };

  const handleRecipeButtonClick = (dishId: string) => {
    setDishId(dishId);
    setIsRecipeModalOpen(true);
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
      render: (_: any, dish: Dish) => {
        const { recipe } = dish;
        const hasRecipeInfo =
          recipe?.link ||
          recipe?.ingredientsText ||
          recipe?.instructions.length;
        if (hasRecipeInfo) {
          return (
            <Button onClick={() => handleRecipeButtonClick(dish._id)}>
              View <ZoomInOutlined />
            </Button>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: "Edit",
      key: "edit",
      render: (_: any, dish: Dish) => (
        <Button onClick={() => editDish(dish._id)}>
          Edit <EditOutlined />
        </Button>
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

  if (!session) {
    return (
      <Layout>
        <div>Please log in to view this page</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {dishContextHolder}
      <DishModal
        modalAction={modalAction}
        isModalOpen={isDishModalOpen}
        setIsModalOpen={setIsDishModalOpen}
        dish={dish}
        session={session as UserSession}
      />
      <RecipeModal
        isModalOpen={isRecipeModalOpen}
        setIsModalOpen={setIsRecipeModalOpen}
        dish={dish}
      />

      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" onClick={addDish}>
            Add Dish
          </Button>
        </div>
        <Table
          rowKey="_id"
          dataSource={dishes?.data}
          columns={columns}
          loading={isLoading}
        />
      </Space>
    </Layout>
  );
};

export default Dish;
