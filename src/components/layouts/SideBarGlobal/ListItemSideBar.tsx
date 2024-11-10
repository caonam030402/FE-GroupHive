import { RiMessage3Fill } from "@react-icons/all-files/ri/RiMessage3Fill";
import React from "react";

import SectionSideBar from "./SectionSideBar";

export const listSidebarItems = [
  {
    id: "1",
    title: "Messages",
    href: "workplace/messages",
    icon: <RiMessage3Fill />,
    children: [],
  },
  {
    id: "2",
    title: "Meetings",
    href: "workplace/calls",
    icon: <RiMessage3Fill />,
    children: [],
  },
  {
    id: "3",
    title: "Calendar",
    href: "workplace/groups",
    icon: <RiMessage3Fill />,
    children: [],
  },
  {
    id: "4",
    title: "Docs",
    href: "workplace/contacts",
    icon: <RiMessage3Fill />,
    children: [],
  },
  {
    id: "6",
    title: "Workplace",
    href: "workplace/settings",
    icon: <RiMessage3Fill />,
    children: [],
  },
  {
    id: "7",
    title: "Base",
    href: "workplace/settings",
    icon: <RiMessage3Fill />,
    children: [],
  },
  {
    id: "8",
    title: "Base",
    href: "workplace/settings",
    icon: <RiMessage3Fill />,
    children: [
      {
        id: "5",
        title: "Contacts",
        href: "workplace/settings",
        icon: <RiMessage3Fill />,
        children: [],
      },
      {
        id: "6",
        title: "Favor",
        href: "workplace/settings",
        icon: <RiMessage3Fill />,
        children: [],
      },
    ],
  },
];

export default function ListItemSideBar() {
  return (
    <div className="w-full space-y-2">
      {listSidebarItems.map((item) => (
        <SectionSideBar key={item.id} item={item} />
      ))}
    </div>
  );
}
