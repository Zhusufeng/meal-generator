import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";

const items: MenuProps["items"] = [
  {
    label: <Link href="/">Meal Plan</Link>,
    key: "mealPlan",
  },
  {
    label: <Link href="/">Meal History</Link>,
    key: "mealHistory",
  },
  {
    label: <Link href="/">Dish Catalog</Link>,
    key: "dishCatalog",
  },
  {
    label: <Link href="/">Family</Link>,
    key: "family",
  },
];

const NavBar = () => {
  const [current, setCurrent] = useState("mealPlan");
  const onClick: MenuProps["onClick"] = e => {
    console.log("click ", e);
    setCurrent(e.key);
  };

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
        <div style={{ fontSize: "18px" }}>
          <Link href="/">🍽️ Meal Planner</Link>
        </div>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{
            backgroundColor: "#BFEBFF",
          }}
        />
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
