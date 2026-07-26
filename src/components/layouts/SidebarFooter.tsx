import { Button, Typography } from 'antd'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import user from '/user.png'
import { logout } from '@/app/authSlice'
import { useAppSelector } from '@/app/store'
import { ROUTES } from '@/types/route'

type Props = {
  collapsed?: boolean
  isActive?: boolean
}

export const SidebarFooter: FC<Props> = ({ collapsed = false, isActive = false }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.MAIN)
  }

  return (
    <div className="flex flex-col w-full py-2 mb-5">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate(ROUTES.PROFILE)}
      >
        <img
          alt="logo"
          src={user}
          className={`h-10 w-10 rounded-full ${isActive ? 'border border-blue-500' : ''}`}
        />
        {!collapsed && (
          <Typography className={`text-base font-bold ${isActive ? 'text-blue-500' : ''}`}>
            {currentUser?.name ?? 'Пользователь'}
          </Typography>
        )}
      </div>
      {!collapsed && (
        <Button type="link" className="mt-2 self-start px-0 text-red-500" onClick={handleLogout}>
          Выйти
        </Button>
      )}
    </div>
  )
}
