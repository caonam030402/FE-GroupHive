/* eslint-disable jsx-a11y/no-static-element-interactions */

"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import QuickCreate from "@/components/business/QuickCreate";
import QuickSearch from "@/components/business/QuickSearch";
import UserSetting from "@/components/business/UserSetting";
import { cn } from "@/libs/utils";
import { selectIsCollapsed } from "@/stores/setting/selectors";
import { setIsCollapsedSideBar } from "@/stores/setting/slice";

import useResize from "./hooks/useResize";
import ListItemSideBar from "./ListItemSideBar";

export default function SideBarGlobal() {
  const dispatch = useDispatch();
  const minWidth = 150;
  const minWidthCollapse = 70;
  const isCollapsedSideBar = useSelector(selectIsCollapsed);

  const checkHandleCollapse = (sidebarWidth: number, setSidebarWidth: any) => {
    if (sidebarWidth < minWidth + 10) {
      setSidebarWidth(minWidthCollapse);
      dispatch(setIsCollapsedSideBar(true));
    } else {
      dispatch(setIsCollapsedSideBar(false));
    }
  };
  const { sidebarWidth, handleMouseDown } = useResize({
    setAction: checkHandleCollapse,
    minWidth,
  });

  const isBetweenStyle = isCollapsedSideBar ? "flex flex-col items-center" : "";

  return (
    <div className="flex h-screen">
      <div
        style={{ width: sidebarWidth }}
        className={cn("flex h-full w-[230px] flex-col justify-between p-3", {
          "pl-[3px] pr-[1px]": isCollapsedSideBar,
        })}
      >
        <div className={cn("w-full space-y-6", isBetweenStyle)}>
          <div className="flex justify-between">
            <UserSetting />
            {!isCollapsedSideBar && <QuickCreate />}
          </div>
          <ListItemSideBar />
        </div>
        <div className={cn("space-y-2 w-full", isBetweenStyle)}>
          {isCollapsedSideBar && <QuickCreate />}
          <QuickSearch isExpanded={!isCollapsedSideBar} />
        </div>
      </div>
      <div
        className="w-[2px] cursor-col-resize hover:bg-primary"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
