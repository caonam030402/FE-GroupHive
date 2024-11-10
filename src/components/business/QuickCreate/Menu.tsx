import { Button } from "@nextui-org/button";
import { BiGroup } from "@react-icons/all-files/bi/BiGroup";
import { BiVideo } from "@react-icons/all-files/bi/BiVideo";
import { BiVideoPlus } from "@react-icons/all-files/bi/BiVideoPlus";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { HiOutlineDocumentAdd } from "@react-icons/all-files/hi/HiOutlineDocumentAdd";
import React from "react";

const listQuickCreate = [
  {
    id: "1",
    name: "New Group",
    icon: <BiGroup />,
  },
  {
    id: "2",
    name: "Add External Contact",
    icon: <FiUser />,
  },
  {
    id: "3",
    name: "New Docs",
    icon: <HiOutlineDocumentAdd />,
  },
  {
    id: "4",
    name: "New Video Meeting",
    icon: <BiVideoPlus />,
  },
  {
    id: "5",
    name: "Join Video Meeting",
    icon: <BiVideo />,
  },
];

export default function Menu() {
  return (
    <div className="w-[10vw] py-2">
      {listQuickCreate.map((item) => (
        <Button
          variant="solid"
          className="w-full justify-start rounded-sm bg-transparent p-2 hover:bg-primary-50/50"
          key={item.id}
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.name}</span>
        </Button>
      ))}
    </div>
  );
}
