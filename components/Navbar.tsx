import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const router = useRouter();
  const { data: session } = useSession();
  const [current, setCurrent] = useState(router.pathname);

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
        {session ? (
          <>
            <div>Signed in as {session.user.email}</div>
            <div>
              <Button onClick={() => signOut()}>Log Out</Button>
            </div>
          </>
        ) : (
          <>
            <div>Not signed in</div>
            <div>
              <Button onClick={() => signIn("google")}>Log In</Button>
            </div>
          </>
        )}
      </div>
    </Layout.Header>
  );
};

export default NavBar;
