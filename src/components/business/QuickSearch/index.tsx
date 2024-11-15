import { Button } from "@nextui-org/button";
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import React from "react";

interface Props {
  isExpanded?: boolean;
}

export default function QuickSearch({ isExpanded }: Props) {
  if (isExpanded) {
    return (
      <Button
        size="sm"
        className="size-4 w-full justify-start py-2 text-gray-500"
      >
        <BiSearch className="text-xl" /> Search
      </Button>
    );
  }
  return (
    <Button size="sm" isIconOnly className="size-4 rounded-full">
      <BiSearch className="text-xl" />
    </Button>
  );
}
