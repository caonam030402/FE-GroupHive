import React from "react";

import SideBarGlobal from "@/components/layouts/SideBarGlobal";

interface Props {
  children: React.ReactNode;
}
export default function layoutWorkplace({ children }: Props) {
  return (
    <div className="flex">
      <SideBarGlobal />
      <div className="ml-[0.5px] size-full h-screen py-3 pr-3">
        <div className=" size-full rounded-md bg-white">{children}</div>
      </div>
    </div>
  );
}
