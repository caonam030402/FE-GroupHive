import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React from "react";

import Contents from "./Contents";

export default function UserSetting() {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          size="md"
        />
      </PopoverTrigger>
      <PopoverContent>
        <Contents />
      </PopoverContent>
    </Popover>
  );
}
