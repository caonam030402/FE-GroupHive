import { Button } from "@nextui-org/button";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import React from "react";

import { cn } from "@/libs/utils";

import type { listSidebarItems } from "./ListItemSideBar";

type SidebarItemType = (typeof listSidebarItems)[number];

interface IItemSideBar extends SidebarItemType {
  isOpenSubMenu: boolean;
  isHasSubMenu?: boolean;
  openSubMenu: () => void;
}

export default function ItemSideBar({ item }: { item: IItemSideBar }) {
  const renderIconAccordion = () => {
    if (item.children && item.children.length > 0) {
      return (
        <div>
          <IoIosArrowDown
            className={cn(
              "transform transition-transform duration-300 rotate-0",
              {
                "rotate-180": item.isOpenSubMenu,
              },
            )}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <Button
      onClick={() => {
        if (item.isHasSubMenu) {
          item.openSubMenu();
        }
      }}
      className="flex w-full justify-start bg-transparent px-2 hover:bg-primary-500/20"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{item.icon}</span>
          <span>{item.title}</span>
        </div>
        {renderIconAccordion()}
      </div>
    </Button>
  );
}
