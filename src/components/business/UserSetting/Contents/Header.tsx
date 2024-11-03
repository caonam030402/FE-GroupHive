import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import React from "react";

export default function AccountHeader() {
  return (
    <>
      <div className="flex items-center gap-2 ">
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          size="md"
        />
        <div>
          <div className="text-base font-bold">John Doe</div>
          <div className="text-tiny">Administrator</div>
        </div>
      </div>

      <Input
        className="mt-3"
        placeholder="Say some thing about yourself..."
        size="sm"
      />
    </>
  );
}
