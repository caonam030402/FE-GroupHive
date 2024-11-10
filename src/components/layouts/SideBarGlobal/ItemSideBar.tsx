import { Button } from "@nextui-org/button";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import React from "react";
import { useSelector } from "react-redux";

import { cn } from "@/libs/utils";
import { selectIsCollapsed } from "@/stores/setting/selectors";

import type { listSidebarItems } from "./ListItemSideBar";

type SidebarItemType = (typeof listSidebarItems)[number];

interface IItemSideBar extends SidebarItemType {
  isOpenSubMenu: boolean;
  isHasSubMenu?: boolean;
  openSubMenu: () => void;
  isParent?: boolean;
}

export default function ItemSideBar({ item }: { item: IItemSideBar }) {
  const isActive = item.id === "1";
  const isCollapsedSideBar = useSelector(selectIsCollapsed);
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
      isIconOnly={isCollapsedSideBar}
      onClick={() => {
        if (item.isHasSubMenu) {
          item.openSubMenu();
        }
      }}
      className={cn(
        "flex w-full justify-start bg-transparent hover:bg-primary-500/20 rounded-md p-2 text-sm",
        {
          "bg-primary-500/20": isActive,
        },
        {
          "h-[50px]": isCollapsedSideBar,
        },
      )}
    >
      <div
        className={cn("flex w-full items-center justify-between gap-2", {
          "flex-col items-center text-[10px]": isCollapsedSideBar,
        })}
      >
        <div
          className={cn("flex items-center gap-2", {
            "flex-col gap-0": isCollapsedSideBar,
          })}
        >
          <span className="text-xl">
            {item.isOpenSubMenu && isCollapsedSideBar && item.isParent ? (
              <IoIosArrowDown />
            ) : (
              item.icon
            )}{" "}
          </span>
          <span>{item.title}</span>
        </div>
        {!isCollapsedSideBar && renderIconAccordion()}
      </div>
    </Button>
  );
}