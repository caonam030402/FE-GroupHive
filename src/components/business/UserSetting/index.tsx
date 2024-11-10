"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

import { userMenuOptions } from "@/constants/setting";

import AccountHeader from "./AccountHeader";

export default function UserSetting() {
  return (
    <Dropdown placement="left-start">
      <DropdownTrigger>
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          size="md"
        />
      </DropdownTrigger>
      <DropdownMenu
        className="w-[30vw]"
        variant="faded"
        aria-label="Dropdown menu with "
      >
        <DropdownSection aria-label="Profile & Actions">
          <DropdownItem isReadOnly>
            <AccountHeader />
          </DropdownItem>
        </DropdownSection>
        {
          userMenuOptions.map((item, index) => (
            <DropdownSection
              key={item.id}
              title={item.title}
              showDivider={index !== userMenuOptions.length - 1}
            >
              {item.children.map((child) => (
                <DropdownItem
                  key={child.id}
                  startContent={<span>{child.icon}</span>}
                >
                  {child.title}
                </DropdownItem>
              ))}
            </DropdownSection>
          )) as any
        }
      </DropdownMenu>
    </Dropdown>
  );
}
