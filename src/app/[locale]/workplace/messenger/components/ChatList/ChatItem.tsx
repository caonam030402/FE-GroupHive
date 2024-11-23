"use client";

import { Avatar } from "@nextui-org/avatar";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { cn } from "@/libs/utils";

interface Props {
  item: {
    id: number;
    name: string;
    avatar: string;
    time: string;
    message: string;
  };
}

export default function ChatItem({ item }: Props) {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isActive = item.id.toString() === params.id[0];

  const handleClick = () => {
    router.push(`/workplace/messenger/${item.id}`);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("flex items-center gap-2 py-3 px-2 rounded-md", {
        "bg-primary-200/20": isActive,
      })}
    >
      <Avatar className="shrink-0" src={item.avatar} />
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <p className="text-[15px] font-medium">{item.name}</p>
          <p>{item.time}</p>
        </div>
        <p className="line-clamp-1 text-start">{item.message}</p>
      </div>
    </button>
  );
}
