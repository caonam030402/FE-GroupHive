import { Button } from "@nextui-org/button";
import React from "react";

import { ThemeSwitcher } from "@/components/business/ThemeSwitcher";

export default function HomePage() {
  return (
    <div>
      <Button color="primary">Button</Button>
      <ThemeSwitcher />
    </div>
  );
}
