import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import user from "/user.png";
import { Typography } from "antd";
import { ROUTES } from "../../types/route";

type Props = {
  collapsed?: boolean;
  isActive?: boolean;
}

export const SidebarFooter: FC<Props> = ({ collapsed = false, isActive = false }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center w-full py-2 mb-5 gap-4 cursor-pointer" onClick={() => navigate(ROUTES.PROFILE)}>
      <img alt="logo" src={user} className={`h-10 w-10 rounded-full ${isActive ? "border border-blue-500" : ""}`} />
      {!collapsed && <Typography className={`text-base font-bold ${isActive ? "text-blue-500" : ""}`}>Yaropolk</Typography>}
    </div>
  )
}