import React from "react";

import ChatList from "./components/ChatList";

type Props = {
  children: React.ReactNode;
};

export default function layoutMessenger({ children }: Props) {
  return (
    <div className="flex h-full flex-1 gap-1 overflow-hidden">
      <div className="h-full w-1/4">
        <ChatList />
      </div>
      <div className="h-full flex-1">{children}</div>
    </div>
  );
}
