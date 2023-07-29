import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const items: MenuProps["items"] = [
  {
    label: <Link href="/plan">Meal Plan</Link>,
    key: "/plan",
  },
  {
    label: <Link href="/history">Meal History</Link>,
    key: "/history",
  },
  {
    label: <Link href="/dish">Dish Catalog</Link>,
    key: "/dish",
  },
  {
    label: <Link href="/family">Family</Link>,
    key: "/family",
  },
];

const NavBar = () => {
  const [current, setCurrent] = useState("/plan");
  const router = useRouter();

  useEffect(() => {
    setCurrent(router.pathname);
  }, [router]);

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
