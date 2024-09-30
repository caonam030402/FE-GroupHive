import { Button } from "@nextui-org/button";
import { FaApple } from "@react-icons/all-files/fa/FaApple";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import React from "react";

import Divider from "@/components/common/divider";

const listItemProvider = [
  {
    name: "Google",
    icon: <FcGoogle />,
  },
  {
    name: "Apple",
    icon: <FaApple />,
  },
  {
    name: "Facebook",
    icon: <FaFacebookF />,
  },
];

export default function AuthWithProvider() {
  return (
    <div className="space-y-4">
      <div className="flex w-full items-center">
        <Divider className="h-px w-full bg-default-300" />
        <div className="w-1/2 text-center text-default-500">
          Or continue with
        </div>
        <Divider className="h-px w-full bg-default-300" />
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        {listItemProvider.map((item, index) => (
          <Button size="md" className="w-full" key={index}>
            {item.icon}
            <span>{item.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
