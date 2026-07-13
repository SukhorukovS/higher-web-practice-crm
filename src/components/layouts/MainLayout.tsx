import { Button, Drawer, Layout, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { SidebarFooter } from '@/components/layouts/SidebarFooter'
import { SidebarHeader } from '@/components/layouts/SidebarHeader'
import { useIsMobile } from '@/hooks/useIsMobile'
import { BurgerIcon } from '@/icons/BurgerIcon'
import { ClientsIcon } from '@/icons/ClientsIcon'
import { DealsIcon } from '@/icons/DealsIcon'
import { MainIcon } from '@/icons/MainIcon'
import { ReportsIcon } from '@/icons/ReportsIcon'
import { TasksIcon } from '@/icons/TasksIcon'
import { UserIcon } from '@/icons/UserIcon'
import { ROUTES } from '@/types/route'

const { Sider } = Layout

const menuItems = [
  { key: ROUTES.DASHBOARD, icon: <MainIcon />, label: 'Главная' },
  { key: ROUTES.CLIENTS, icon: <ClientsIcon />, label: 'Клиенты' },
  { key: ROUTES.DEALS, icon: <DealsIcon />, label: 'Сделки' },
  { key: ROUTES.REPORTS, icon: <ReportsIcon />, label: 'Отчеты' },
  { key: ROUTES.TASKS, icon: <TasksIcon />, label: 'Задачи' },
]

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setCollapsed(isMobile)
  }, [isMobile])

  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
    setDrawerOpen(false)
  }

  if (isMobile) {
    return (
      <Layout className="min-h-screen">
        <div className="flex w-full justify-between items-center border-b border-gray-300 bg-white pb-3 pt-2 px-10 rounded-b-xl">
          <div className="cursor-pointer" onClick={() => setDrawerOpen(true)}>
            <BurgerIcon />
          </div>
          <img alt="logo" src="/logo-mob.png" className="h-6" />
          <Button variant="link" color="default" onClick={() => navigate(ROUTES.PROFILE)}>
            <UserIcon />
          </Button>
        </div>
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={280}
          styles={{ body: { padding: 0 } }}
        >
          <div className="flex flex-col h-full p-5">
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[location.pathname]}
              onClick={handleMenuClick}
              style={{ background: 'transparent', border: 'none' }}
              classNames={{
                item: 'pl-0! flex shrink-0 m-0 gap-2 border-b border-gray-300 last:border-b-0 rounded-none py-4 h-auto text-base',
              }}
              items={menuItems}
            />
          </div>
        </Drawer>
        <div className="flex-1 p-5 overflow-y-auto">
          <Outlet />
        </div>
      </Layout>
    )
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
            items={menuItems}
          />
          <div className="mt-auto">
            <SidebarFooter collapsed={collapsed} isActive={location.pathname === ROUTES.PROFILE} />
          </div>
        </div>
      </Sider>
      <div className="flex-1 flex flex-col h-full p-5 overflow-y-auto">
        <Outlet />
      </div>
    </Layout>
  )
}
