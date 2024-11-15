import React from "react";

import ChatList from "./components/ChatList";

interface Props {
  children: React.ReactNode;
}
export default function layoutMessenger({ children }: Props) {
  return (
    <div className="flex">
      <ChatList />
      {children}
    </div>
  );
}
