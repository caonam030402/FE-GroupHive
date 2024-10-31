"use client";

import { Button } from "@nextui-org/button";
import React from "react";

import { ThemeSwitcher } from "@/components/business/ThemeSwitcher";
import { signOut } from "@/configs/auth/action";

export default function HomePage() {
  return (
    <div>
      <Button
        onClick={() => {
          signOut();
        }}
        color="primary"
      >
        Button
      </Button>
      <ThemeSwitcher />
    </div>
  );
}
