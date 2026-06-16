import { Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { SidebarHeader } from "./SidebarHeader";
import { MainIcon } from "../../icons/MainIcon";
import { ClientsIcon } from "../../icons/ClientsIcon";
import { DealsIcon } from "../../icons/DealsIcon";
import { ReportsIcon } from "../../icons/ReportsIcon";
import { TasksIcon } from "../../icons/TasksIcon";
import { SidebarFooter } from "./SidebarFooter";

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
        <div className="flex flex-col h-full">
          <SidebarHeader collapsed={collapsed} onClick={toggleCollapsed} />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ background: 'transparent', border: 'none' }}
            classNames={{
              item: `pl-0! flex shrink-0 m-0 ${collapsed ? 'gap-0' :'gap-2'} border-b border-gray-300 last:border-b-0 rounded-none py-4 h-auto text-base`,
            }}
            items={[
              {
                key: "1",
                icon: <MainIcon />,
                label: "Главная",
              },
              {
                key: "2",
                icon: <ClientsIcon />,
                label: "Клиенты",
              },
              {
                key: "3",
                icon: <DealsIcon />,
                label: "Сделки",
              },            {
                key: "4",
                icon: <ReportsIcon />,
                label: "Отчеты",
              },            {
                key: "5",
                icon: <TasksIcon />,
                label: "Задачи",
              },
            ]}
          />
          <div className="mt-auto">
            <SidebarFooter collapsed={collapsed} onClick={() => {}} />
          </div>
        </div>
      </Sider>
      <Outlet />
    </Layout>
  );
};
