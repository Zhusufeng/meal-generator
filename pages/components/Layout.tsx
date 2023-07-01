import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Layout className="layout" style={{ height: "100vh", width: "100vw" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div>Breakfast</div>
      </Header>
      <Content style={{ padding: "50px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>(C) 2023 Lisa</Footer>
    </Layout>
  );
};

export default MainLayout;
