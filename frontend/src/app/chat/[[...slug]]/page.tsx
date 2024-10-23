"use client";
import Chat from "@/components/chat/Chat";
import { ChatMessage, ChatMessageRating } from "@/components/chat/types";
import React from "react";
import ChatLayout from "./ChatLayout";
import { useParams } from "next/navigation";
import Logo from "@/components/Logo";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatPromptInput from "@/components/chat/ChatPromptInput";

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
    id: "0192b4d8-d7a3-7ba9-ac30-4580109e3a7g",
    sender: "Anda",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content: "Apa itu Udinus?",
    createdAt: new Date(2024, 1, 1, 12, 48),
    position: "right",
  },
  {
    id: "0192b4d8-516b-74c2-8455-2c2f05c4dd99",
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
  {
    id: "0192b4d8-516b-74c2-8455-2c2f05c4ad42",
    sender: "Asisten",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content:
      "Udinus adalah kampus di Semarang. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi consectetur sint atque repudiandae commodi dignissimos deleniti. Animi, dolorem reiciendis debitis tenetur pariatur facere inventore assumenda tempore, illum repellat aspernatur aliquam. Doloribus eligendi tempore ut delectus iste voluptates quibusdam blanditiis, omnis molestias velit voluptas aperiam nostrum vitae dolores ipsum dignissimos magni, laudantium odio quae nesciunt, asperiores saepe nisi perspiciatis? Iusto, quo quidem distinctio nam perspiciatis esse quod asperiores fugit molestiae voluptatibus architecto accusamus. Provident odio ipsum consectetur laboriosam nostrum aperiam excepturi amet dicta sequi ullam quod modi animi dolores iste vel doloremque harum eum, distinctio fugit quos commodi expedita eos cupiditate!",
    createdAt: new Date(2024, 1, 2, 10, 35),
    position: "left",
    rateable: true,
    regeneratable: true,
  },
  {
    id: "0192b4d8-516b-74c2-8455-2c2f05c4dd43",
    sender: "Anda",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content: "Apa itu AI?",
    createdAt: new Date(2024, 1, 2, 10, 40),
    position: "right",
  },
  {
    id: "0192b4d8-516b-74c2-8455-2c2f05c4da99",
    sender: "Asisten",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content:
      "AI adalah Artificial Intelligence. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi consectetur sint atque repudiandae commodi dignissimos deleniti. Animi, dolorem reiciendis debitis tenetur pariatur facere inventore assumenda tempore, illum repellat aspernatur aliquam. Doloribus eligendi tempore ut delectus iste voluptates quibusdam blanditiis, omnis molestias velit voluptas aperiam nostrum vitae dolores ipsum dignissimos magni, laudantium odio quae nesciunt, asperiores saepe nisi perspiciatis? Iusto, quo quidem distinctio nam perspiciatis esse quod asperiores fugit molestiae voluptatibus architecto accusamus. Provident odio ipsum consectetur laboriosam nostrum aperiam excepturi amet dicta sequi ullam quod modi animi dolores iste vel doloremque harum eum, distinctio fugit quos commodi expedita eos cupiditate!",
    createdAt: new Date(2024, 1, 2, 10, 35),
    position: "left",
    rateable: true,
    regeneratable: true,
  },
  {
    id: "0192b4d8-516b-74c2-8455-2c2f05c4dd33",
    sender: "Anda",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content: "Apa itu AI?",
    createdAt: new Date(2024, 1, 2, 10, 40),
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
    <ChatLayout
      activeChatId={chatId}
      className="flex h-screen flex-col gap-2"
    >
      <ChatHeader />
      <Chat
        messages={messages}
        onRate={handleMessageRate}
        className="flex-1 overflow-y-auto"
      />
      <ChatPromptInput className="z-50"/>
    </ChatLayout>
  );
}
