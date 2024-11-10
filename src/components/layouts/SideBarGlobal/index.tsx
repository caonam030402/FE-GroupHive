import React from "react";

import QuickCreate from "@/components/business/QuickCreate";
import UserSetting from "@/components/business/UserSetting";

export default function SideBarGlobal() {
  return (
    <div className="flex w-[80px] flex-col p-3">
      <UserSetting />
      <QuickCreate />
    </div>
  );
}
