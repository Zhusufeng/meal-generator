import { Button, Table, notification } from "antd";
import axios from "axios";
import useSWR from "swr";
import Layout from "../components/Layout";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Dish: React.FC = () => {
  const {
    data: dishData,
    error: dishError,
    isLoading,
  } = useSWR("/api/dish", fetcher);
  console.log("dishData", dishData);

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
      render: (_, record) => <Button>Edit Dish</Button>,
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
      <Button>Add Dish</Button>
      <Table
        dataSource={dishData?.data}
        columns={columns}
        loading={isLoading}
      />
    </Layout>
  );
};

export default Dish;
