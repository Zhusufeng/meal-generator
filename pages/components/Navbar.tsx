import { Button, Layout } from "antd";

const NavBar = () => {
  return (
    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#BFEBFF",
      }}
    >
      <div style={{ display: "flex", columnGap: "40px" }}>
        <div>🍽️ Meal Planner</div>
        <div style={{ display: "flex", columnGap: "20px" }}>
          <div>Meal Plan</div>
          <div>Meal History</div>
          <div>Dish Catalog</div>
          <div>Family Members</div>
        </div>
      </div>
      <div style={{ display: "flex", columnGap: "20px" }}>
        <div>Greeting Here</div>
        <div>
          <Button>Log Out</Button>
        </div>
      </div>
    </Layout.Header>
  );
};

export default NavBar;
