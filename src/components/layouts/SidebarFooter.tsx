import type { FC } from "react";

import user from "/user.png";
import { Typography } from "antd";

type Props = {
  onClick: () => void
  collapsed?: boolean
}

export const SidebarFooter: FC<Props> = ({ onClick, collapsed = false }) => {
  return (
    <div className="flex items-center w-full py-2 mb-5 gap-4" onClick={onClick}>
      <img alt="logo" src={user} className="h-10 w-10 rounded-full" />
      {!collapsed && <Typography className="text-base font-bold">Yaropolk</Typography>}
    </div>
  )
}