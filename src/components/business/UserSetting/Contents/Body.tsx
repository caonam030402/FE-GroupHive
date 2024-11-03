"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

import Divider from "@/components/common/Divider";
import { userMenuOptions } from "@/constants/setting";

export default function Body() {
  const router = useRouter();

  const handleAction = (href: string, action: (() => void) | undefined) => {
    if (action) {
      action();
    } else {
      router.push(href);
    }
  };

  return (
    <div className="mt-3">
      {userMenuOptions.map((item, index) => (
        <div key={item.id}>
          {item.children.map((child) => (
            <Button
              variant="solid"
              onClick={() => handleAction(child.href, child.action)}
              className="w-full justify-start rounded-sm bg-transparent p-2 hover:bg-primary-50/50"
              key={child.id}
            >
              {child.title}
            </Button>
          ))}
          {index !== userMenuOptions.length - 1 && <Divider className="my-1" />}
        </div>
      ))}
    </div>
  );
}
