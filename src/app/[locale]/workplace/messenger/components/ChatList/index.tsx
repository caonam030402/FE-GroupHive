import React from "react";

import Card from "@/components/common/Card";

import ChatItem from "./ChatItem";
import { listChatMock } from "./mock";
import SearchChat from "./SearchChat";

export default function ChatList() {
  return (
    <Card classNames={{ body: "pt-0" }} header={<SearchChat />}>
      {listChatMock.map((item) => (
        <ChatItem item={item} key={item.id} />
      ))}
    </Card>
  );
}
