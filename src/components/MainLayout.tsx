import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const { Sider } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
        <div className="demo-logo-vertical" />
        МЕНЮ
      </Sider>
      <Outlet />
    </Layout>
  );
}