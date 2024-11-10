/* eslint-disable jsx-a11y/no-static-element-interactions */

"use client";

import React from "react";

import QuickCreate from "@/components/business/QuickCreate";
import QuickSearch from "@/components/business/QuickSearch";
import UserSetting from "@/components/business/UserSetting";

import useResize from "./hooks/useResize";
import ListItemSideBar from "./ListItemSideBar";

export default function SideBarGlobal() {
  const { sidebarWidth, handleMouseDown } = useResize();

  return (
    <div className="flex h-screen">
      <div
        style={{ width: sidebarWidth }}
        className="flex h-full w-[230px] flex-col items-start justify-between border-r p-3"
      >
        <div className="w-full">
          <UserSetting />
          <ListItemSideBar />
        </div>
        <div className="space-y-2">
          <QuickCreate />
          <QuickSearch />
        </div>
      </div>
      <div
        className="w-[0.5px] cursor-col-resize bg-primary-50 hover:bg-primary"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
