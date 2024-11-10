import { Button } from "@nextui-org/button";
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import React from "react";

export default function QuickSearch() {
  return (
    <Button isIconOnly className="size-4 rounded-full">
      <BiSearch className="text-xl" />
    </Button>
  );
}
