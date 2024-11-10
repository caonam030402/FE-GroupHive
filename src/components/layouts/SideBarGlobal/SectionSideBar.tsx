"use client";

import React, { useState } from "react";

import ItemSideBar from "./ItemSideBar";
import type { listSidebarItems } from "./ListItemSideBar";

export default function SectionSideBar({
  item,
}: {
  item: (typeof listSidebarItems)[0];
}) {
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
        }}
      />
      <div
        className={`submenu ml-4 border-l pl-2 ${isOpenSubMenu ? "open" : ""}`}
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
