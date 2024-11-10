"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { BiGroup } from "@react-icons/all-files/bi/BiGroup";
import { BiVideo } from "@react-icons/all-files/bi/BiVideo";
import { BiVideoPlus } from "@react-icons/all-files/bi/BiVideoPlus";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { HiOutlineDocumentAdd } from "@react-icons/all-files/hi/HiOutlineDocumentAdd";
import React from "react";

const listQuickCreate = [
  {
    id: "1",
    name: "New Group",
    icon: <BiGroup />,
    shortcut: "⌘C",
  },
  {
    id: "2",
    name: "Add External Contact",
    icon: <FiUser />,
    shortcut: "⌘D",
  },
  {
    id: "3",
    name: "New Docs",
    icon: <HiOutlineDocumentAdd />,
    shortcut: "⌘E",
  },
  {
    id: "4",
    name: "New Video Meeting",
    icon: <BiVideoPlus />,
    shortcut: "⌘F",
  },
  {
    id: "5",
    name: "Join Video Meeting",
    icon: <BiVideo />,
    shortcut: "⌘G",
  },
];

export default function QuickCreate() {
  return (
    <Dropdown placement="left-start">
      <DropdownTrigger>
        <Button isIconOnly className="size-4 rounded-full">
          <FiPlus className="text-2xl" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        {listQuickCreate.map((item) => (
          <DropdownItem
            key={item.id}
            // shortcut={item.shortcut}
            startContent={<span>{item.icon}</span>}
          >
            {item.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
