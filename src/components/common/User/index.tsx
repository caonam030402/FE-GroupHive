import { Avatar } from "@nextui-org/avatar";
import React from "react";

interface Props {
  info: {
    name?: string;
    email?: string;
    avatar: string;
  };
  onlyAvatar?: boolean;
}

export default function User({ info, onlyAvatar }: Props) {
  return (
    <div className="flex cursor-pointer items-center gap-2" aria-hidden="true">
      <Avatar
        className="shrink-0"
        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        size="md"
      />
      {!onlyAvatar && (
        <div>
          <div className="text-base font-bold">{info.name}</div>
          <div className="text-tiny">{info.email}</div>
        </div>
      )}
    </div>
  );
}
