import { FaCalendar } from "@react-icons/all-files/fa/FaCalendar";
import { FaVideo } from "@react-icons/all-files/fa/FaVideo";
import { HiViewGrid } from "@react-icons/all-files/hi/HiViewGrid";
import { IoDocumentText } from "@react-icons/all-files/io5/IoDocumentText";
import { MdContacts } from "@react-icons/all-files/md/MdContacts";
import { RiMessage3Fill } from "@react-icons/all-files/ri/RiMessage3Fill";
import React from "react";

import SectionSideBar from "./SectionSideBar";

export const listSidebarItems = [
  {
    id: "1",
    title: "Messages",
    href: "/workplace/messenger",
    icon: <RiMessage3Fill size={18} />,
    children: [],
  },
  {
    id: "2",
    title: "Meetings",
    href: "/workplace/meetings",
    icon: <FaVideo size={18} />,
    children: [],
  },
  {
    id: "3",
    title: "Calendar",
    href: "/workplace/groups",
    icon: <FaCalendar size={15} />,
    children: [],
  },
  {
    id: "4",
    title: "Docs",
    href: "/workplace/contacts",
    icon: <IoDocumentText size={18} />,
    children: [],
  },
  {
    id: "6",
    title: "Contact",
    href: "/workplace/settings",
    icon: <MdContacts size={18} />,
    children: [],
  },
  {
    id: "8",
    title: "Workplace",
    href: "/workplace/settings",
    icon: <HiViewGrid size={23} />,
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
        href: "/workplace/settings",
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
