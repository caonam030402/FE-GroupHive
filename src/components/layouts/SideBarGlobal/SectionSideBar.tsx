"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { cn } from "@/libs/utils";
import { selectIsCollapsed } from "@/stores/setting/selectors";

import ItemSideBar from "./ItemSideBar";
import type { listSidebarItems } from "./ListItemSideBar";

export default function SectionSideBar({
  item,
}: {
  item: (typeof listSidebarItems)[0];
}) {
  const isCollapsedSideBar = useSelector(selectIsCollapsed);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  const isHasSubMenu = item.children && item.children.length > 0;

  const openSubMenu = () => {
    setIsOpenSubMenu(!isOpenSubMenu);
  };

  return (
    <div key={item.id}>
      <ItemSideBar
        item={{
          ...item,
          isOpenSubMenu,
          isHasSubMenu,
          openSubMenu,
          isParent: true,
        }}
      />
      <div
        className={cn(
          `submenu ml-4 border-l pl-2 ${isOpenSubMenu ? "open" : ""}`,
          {
            "ml-0 pl-0": isCollapsedSideBar,
          },
        )}
      >
        {isOpenSubMenu &&
          item.children &&
          item.children.map((child) => (
            <ItemSideBar
              key={child.id}
              item={{
                ...child,
                isOpenSubMenu,
                isHasSubMenu: child.children.length > 0,
                openSubMenu,
              }}
            />
          ))}
      </div>
    </div>
  );
}
