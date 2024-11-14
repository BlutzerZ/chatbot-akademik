"use client";
import Chat from "@/components/chat/Chat";
import { ChatMessage, ChatMessageRating } from "@/components/chat/types";
import React from "react";
import ChatLayout from "@/app/chat/[[...slug]]/ChatLayout";
import { useParams } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatPromptInput from "@/components/chat/ChatPromptInput";
import NewChat from "@/components/chat/NewChat";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import client from "@/api/backend-client";
// import useSWR from "swr";
// import fetcher from "@/api/fetcher";
// import client from "@/api/backend-client";

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
    reportable: true,
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
    content:
      "UDINUS (Universitas Dian Nuswantoro) adalah kampus di Semarang, Jawa Tengah.",
    createdAt: new Date(2024, 1, 1, 12, 45),
    position: "left",
    rateable: true,
    regeneratable: true,
    reportable: true,
  },
  {
    id: "0192b4d8-d7a3-7ba9-ac30-4580109e3a7f",
    sender: "Anda",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content: "Apa itu DNCC?",
    createdAt: new Date(2024, 1, 1, 12, 48),
    position: "right",
  },
  {
    id: "0192b4d8-516b-74c2-8455-2c2f05c4ad42",
    sender: "Asisten",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content:
      "DNCC (Dian Nuswantoro Computer Club) adalah sebuah UKM di UDINUS. DNCC memiliki berbagai divisi seperti Game, Data Analyst, Mobile, Jaringan, Multimedia, dan Web.",
    createdAt: new Date(2024, 1, 2, 10, 35),
    position: "left",
    rateable: true,
    regeneratable: true,
    reportable: true,
  },
  {
    id: "0192b4d8-516b-74c2-8455-2c2f05c4dd33",
    sender: "Anda",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content: "Oke terimakasih informasinya Bengky",
    createdAt: new Date(2024, 1, 2, 10, 40),
    position: "right",
  },
  {
    id: "0292b4d8-516b-74c2-8455-2c2f05c4da99",
    sender: "Asisten",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content: "Sama-sama. Senang bisa membantu!",
    createdAt: new Date(2024, 1, 2, 10, 35),
    position: "left",
    rateable: true,
    regeneratable: true,
    reportable: true,
  },
];

export default function ChatPage() {
  const [dummyMessages, setDummyMessages] =
    React.useState<ChatMessage[]>(MESSAGES);
  const params = useParams<PageParams>();
  const chatId = params.slug[0];

  const handleMessageRate = (messageId: string, rating: ChatMessageRating) => {
    setDummyMessages((messages) =>
      messages.map((message) =>
        message.id === messageId ? { ...message, rating } : message,
      ),
    );
  };

  const { isPending, data, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await client.GET("/conversations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          query: {
            limit: 10,
          },
        },
      });
      return res;
    },
  });

  console.log(data);

  return (
    <>
      <Head>
        <title>bngky.</title>
      </Head>
      <ChatLayout
        activeChatId={chatId}
        className="flex h-screen flex-col gap-2"
      >
        <div id="modal-root"></div>
        <ChatHeader />
        {chatId === "new" ? (
          <NewChat />
        ) : (
          <>
            <Chat
              messages={dummyMessages}
              onRate={handleMessageRate}
              className="flex-1 overflow-y-auto"
              isLoading={isPending}
            />
            <ChatPromptInput
              isLoading={isPending}
              className="relative z-10 w-full rounded-none bg-base-100 px-2 pb-5 pt-3 md:px-72 lg:mx-auto lg:pb-14"
            />
          </>
        )}
      </ChatLayout>
    </>
  );
}
