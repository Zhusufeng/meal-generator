import { Layout } from "antd";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Navbar />
      <Layout.Content style={{ padding: "50px" }}>
        <div className="site-layout-content">{children}</div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        (C) 2023 Lisa
      </Layout.Footer>
    </Layout>
  );
};

export default MainLayout;
