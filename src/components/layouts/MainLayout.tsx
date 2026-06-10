import { Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { SidebarCollapseIcon } from "../../icons/SidebarCollapseIcon";
import { SidebarHeader } from "./SidebarHeader";

const { Sider } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        trigger={null}
        width={310}
        className="p-5 border-r border-gray-300"
      >
        <SidebarHeader collapsed={collapsed} onClick={toggleCollapsed} />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ background: 'transparent', border: 'none' }}
          items={[
            {
              key: "1",
              icon: <SidebarCollapseIcon />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <SidebarCollapseIcon />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <SidebarCollapseIcon />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Outlet />
    </Layout>
  );
};
