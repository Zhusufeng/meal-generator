import { Button, Layout } from "antd";
import Link from "next/link";

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
          <div>
            <Link href="/">Meal Plan</Link>
          </div>
          <div>
            <Link href="/">Meal History</Link>
          </div>
          <div>
            <Link href="/">Dish Catalog</Link>
          </div>
          <div>
            <Link href="/">Family Members</Link>
          </div>
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
