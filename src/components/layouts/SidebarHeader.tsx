import type { FC } from "react";
import { SidebarCollapseIcon } from "../../icons/SidebarCollapseIcon"
import { SidebarExpandIcon } from "../../icons/SidebarExpandIcon"

import logo from "/logo.png";

type Props = {
  onClick: () => void
  collapsed?: boolean
}

export const SidebarHeader: FC<Props> = ({ onClick, collapsed = false }) => {
  if (collapsed) {
    return (
      <div className="flex items-center w-full justify-center py-2 mb-5" onClick={onClick}>
        <SidebarExpandIcon />
      </div>
    )
  }

  return (
    <div className="flex items-center w-full justify-between py-2 mb-5">
      <img alt="logo" src={logo} className="h-6" />
      <div onClick={onClick}>
        <SidebarCollapseIcon />
      </div>
    </div>
  )
}