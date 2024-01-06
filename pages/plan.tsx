import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import MealTableCell from "../components/MealTableCell";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

// TODO Keep view logic in a component!
const Plan: React.FC = () => {
  const { data: session } = useSession() as { data: UserSession | null };
  const [mealData, setMealData] = useState([]);
  const [todaysDate, setTodaysDate] = useState(null);

  useEffect(() => {
    const stringDate = dayjs().toISOString();
    setTodaysDate(stringDate);
  }, []);

  const {
    data: meals,
    error: mealsError,
    isLoading: isMealsLoading,
  } = useSWR(
    `/api/meals?userId=${session?.user?.id}&date=${todaysDate}`,
    fetcher
  );
  console.log("meals", meals);

  useEffect(() => {
    // Let's use this data for now (then update the API to return the data in this format!)
    const data = [
      {
        date: "2024-01-04",
        name: "Lisa",
        breakfast: {
          mealId: "100",
          entrees: ["Scrambled Eggs"],
          sides: ["Bacon"],
        },
        lunch: { mealId: "101", entrees: ["Soup"], sides: ["Chips"] },
        dinner: { mealId: "102", entrees: ["Meatloaf"], sides: ["Broccoli"] },
        snack: { mealId: "103", entrees: [], sides: ["Brownies"] },
      },
    ];
    // Idea for family
    // const dataFamily = [
    //   {
    //     date: "2024-01-04",
    //     members: [
    //       {
    //         name: "Lisa",
    //         breakfast: {
    //           mealId: "100",
    //           entrees: ["Scrambled Eggs"],
    //           sides: ["Bacon"],
    //         },
    //         lunch: { mealId: "101", entrees: ["Soup"], sides: ["Chips"] },
    //         dinner: {
    //           mealId: "102",
    //           entrees: ["Meatloaf"],
    //           sides: ["Broccoli"],
    //         },
    //         snack: { mealId: "103", entrees: [], sides: ["Brownies"] },
    //       },
    //     ],
    //   },
    // ];
    setMealData(data);
  }, []);

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
        return <MealTableCell entrees={entrees} sides={sides} />;
      },
    },
    {
      title: "Lunch",
      dataIndex: "lunch",
      key: "lunch",
      render: value => {
        const { entrees, sides } = value;
        return <MealTableCell entrees={entrees} sides={sides} />;
      },
    },
    {
      title: "Dinner",
      dataIndex: "dinner",
      key: "dinner",
      render: value => {
        const { entrees, sides } = value;
        return <MealTableCell entrees={entrees} sides={sides} />;
      },
    },
    {
      title: "Snack",
      dataIndex: "snack",
      key: "snack",
      render: value => {
        const { entrees, sides } = value;
        return <MealTableCell entrees={entrees} sides={sides} />;
      },
    },
  ];

  return (
    <Layout>
      <Table columns={columns} dataSource={mealData} rowKey="date" />
    </Layout>
  );
};

export default Plan;
