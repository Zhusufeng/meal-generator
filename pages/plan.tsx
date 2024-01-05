import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

// TODO Keep view logic in a component!
const Plan: React.FC = () => {
  const { data: session } = useSession() as { data: UserSession | null };
  const [mealData, setMealData] = useState([]);
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const todaysDate = `${year}-${month}-${day}`;

    if (!session) return;

    // Make API call to GET meals with todaysDate and userId

    // Let's use this data for now (then update the API to return the data in this format!)
    const data = [
      {
        mealId: "sadjif",
        date: "2024-01-04",
        name: "Lisa",
        breakfast: {
          entrees: ["Scrambled Eggs"],
          sides: ["Bacon"],
        },
        lunch: { entrees: ["Soup"], sides: ["Chips"] },
        dinner: { entrees: ["Meatloaf"], sides: ["Broccoli"] },
        snack: { entrees: [], sides: ["Brownies"] },
      },
    ];
    setMealData(data);
  }, [session]);

  if (!session) {
    return (
      <Layout>
        <div>Please log in to view this page</div>
      </Layout>
    );
  }

  const columns: ColumnsType = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Breakfast",
      dataIndex: "breakfast",
      key: "breakfast",
      render: value => {
        const { entrees, sides } = value;
        const entreesList = entrees.join(", ");
        const sidesList = sides.join(", ");
        return (
          <div>
            <div>Entrees: {entreesList}</div>
            <div>Sides: {sidesList}</div>
          </div>
        );
      },
    },
    {
      title: "Lunch",
      dataIndex: "lunch",
      key: "lunch",
      render: value => {
        const { entrees, sides } = value;
        const entreesList = entrees.join(", ");
        const sidesList = sides.join(", ");
        return (
          <div>
            <div>Entrees: {entreesList}</div>
            <div>Sides: {sidesList}</div>
          </div>
        );
      },
    },
    {
      title: "Dinner",
      dataIndex: "dinner",
      key: "dinner",
      render: value => {
        const { entrees, sides } = value;
        const entreesList = entrees.join(", ");
        const sidesList = sides.join(", ");
        return (
          <div>
            <div>Entrees: {entreesList}</div>
            <div>Sides: {sidesList}</div>
          </div>
        );
      },
    },
    {
      title: "Snack",
      dataIndex: "snack",
      key: "snack",
      render: value => {
        const { entrees, sides } = value;
        const entreesList = entrees.join(", ");
        const sidesList = sides.join(", ");
        return (
          <div>
            <div>Entrees: {entreesList}</div>
            <div>Sides: {sidesList}</div>
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <Table columns={columns} dataSource={mealData} rowKey="mealId" />
    </Layout>
  );
};

export default Plan;
