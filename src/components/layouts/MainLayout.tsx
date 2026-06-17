import { Layout, Menu } from 'antd'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { SidebarFooter } from '@/components/layouts/SidebarFooter'
import { SidebarHeader } from '@/components/layouts/SidebarHeader'
import { ClientsIcon } from '@/icons/ClientsIcon'
import { DealsIcon } from '@/icons/DealsIcon'
import { MainIcon } from '@/icons/MainIcon'
import { ReportsIcon } from '@/icons/ReportsIcon'
import { TasksIcon } from '@/icons/TasksIcon'
import { ROUTES } from '@/types/route'

const { Sider } = Layout

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

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
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            style={{ background: 'transparent', border: 'none' }}
            classNames={{
              item: `pl-0! flex shrink-0 m-0 ${collapsed ? 'gap-0' : 'gap-2'} border-b border-gray-300 last:border-b-0 rounded-none py-4 h-auto text-base`,
            }}
            items={[
              {
                key: ROUTES.DASHBOARD,
                icon: <MainIcon />,
                label: 'Главная',
              },
              {
                key: ROUTES.CLIENTS,
                icon: <ClientsIcon />,
                label: 'Клиенты',
              },
              {
                key: ROUTES.DEALS,
                icon: <DealsIcon />,
                label: 'Сделки',
              },
              {
                key: ROUTES.REPORTS,
                icon: <ReportsIcon />,
                label: 'Отчеты',
              },
              {
                key: ROUTES.TASKS,
                icon: <TasksIcon />,
                label: 'Задачи',
              },
            ]}
          />
          <div className="mt-auto">
            <SidebarFooter collapsed={collapsed} isActive={location.pathname === ROUTES.PROFILE} />
          </div>
        </div>
      </Sider>
      <div className="flex-1">
        <Outlet />
      </div>
    </Layout>
  )
}
