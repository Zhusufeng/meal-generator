import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

// TODO Keep view logic in a component!
const Family: React.FC = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Layout>
        <div>Please log in to view this page</div>
      </Layout>
    );
  }
  return <Layout>Logged In. Family Page.</Layout>;
};

export default Family;
