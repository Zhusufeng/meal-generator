import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

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
  },
  {
    title: "Lunch",
    dataIndex: "lunch",
    key: "lunch",
  },
  {
    title: "Dinner",
    dataIndex: "dinner",
    key: "dinner",
  },
  {
    title: "Snack",
    dataIndex: "snack",
    key: "snack",
  },
];

// TODO Keep view logic in a component!
const Plan: React.FC = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Layout>
        <div>Please log in to view this page</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Table columns={columns} />
    </Layout>
  );
};

export default Plan;
