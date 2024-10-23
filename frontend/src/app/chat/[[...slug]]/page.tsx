"use client";
import Chat from "@/components/chat/Chat";
import { ChatMessage, ChatMessageRating } from "@/components/chat/types";
import React from "react";
import ChatLayout from "./ChatLayout";
import { useParams } from "next/navigation";
import Logo from "@/components/Logo";

type PageParams = {
  slug: string[];
};

const MESSAGES: ChatMessage[] = [
  {
    id: "0192b4d8-516b-74c2-8455-2c2f05c4dd41",
    sender: "Asisten",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content: "Halo, ada yang bisa dibantu?",
    createdAt: new Date(2024, 1, 1, 12, 45),
    position: "left",
    rateable: true,
    regeneratable: true,
  },
  {
    id: "0192b4d8-d7a3-7ba9-ac30-4580109e3a7f",
    sender: "Anda",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content: "Apa itu Udinus?",
    createdAt: new Date(2024, 1, 1, 12, 48),
    position: "right",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(MESSAGES);
  const params = useParams<PageParams>();
  const chatId = params.slug[0];
  console.log(chatId);

  const handleMessageRate = (messageId: string, rating: ChatMessageRating) => {
    setMessages((messages) =>
      messages.map((message) =>
        message.id === messageId ? { ...message, rating } : message,
      ),
    );
  };

  return (
    <ChatLayout activeChatId={chatId} className="flex flex-col gap-2 p-4">
      <Logo />
      <Chat messages={messages} onRate={handleMessageRate} className="flex-1" />
    </ChatLayout>
  );
}
