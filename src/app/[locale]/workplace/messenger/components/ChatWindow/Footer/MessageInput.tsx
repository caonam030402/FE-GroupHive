import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import { cn } from "@/libs/utils";

import UtilityBar from "./UtilityBar";

export default function MessageInput() {
  const ref = React.useRef<HTMLDivElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Send a message…",
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "outline-none focus:ring-0",
        style: "word-break: break-word; overflow-wrap: break-word;",
      },
    },
  });

  const isOneLine = ref.current?.offsetHeight;

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center rounded-md bg-gray-100 p-3 hover:bg-gray-200 gap-3",
      )}
      style={{
        alignItems: isOneLine ? "center" : "flex-start",
      }}
    >
      <EditorContent
        ref={ref}
        className="min-w-0 flex-1"
        editor={editor}
        style={{ flex: "1 1 auto" }}
      />
      <div className="mt-2 self-end">
        <UtilityBar />
      </div>
    </div>
  );
}
