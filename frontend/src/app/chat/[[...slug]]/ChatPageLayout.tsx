"use client";
import Chat from "@/components/chat/Chat";
import {
  ChatMessage,
  ChatMessageRating,
  MessagesResponse,
} from "@/components/chat/types";
import React from "react";
import ChatLayout from "./ChatLayout";
import { useParams } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatPromptInput from "@/components/chat/ChatPromptInput";
import NewChat from "@/components/chat/NewChat";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import client from "@/api/backend-client";
// import { Conversations } from "@/types/ConversationTypes";
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
    created_at: "1 Januari 2024",
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
    created_at: "1 Januari 2024",
    position: "right",
  },
  {
    id: "0192b4d8-516b-74c2-8455-2c2f05c4dd99",
    sender: "Asisten",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content:
      "UDINUS (Universitas Dian Nuswantoro) adalah kampus di Semarang, Jawa Tengah.",
    created_at: "1 Januari 2024",
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
    created_at: "1 Januari 2024",
    position: "right",
  },
  {
    id: "0192b4d8-516b-74c2-8455-2c2f05c4ad42",
    sender: "Asisten",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content:
      "DNCC (Dian Nuswantoro Computer Club) adalah sebuah UKM di UDINUS. DNCC memiliki berbagai divisi seperti Game, Data Analyst, Mobile, Jaringan, Multimedia, dan Web.",
    created_at: "1 Januari 2024",
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
    created_at: "1 Januari 2024",
    position: "right",
  },
  {
    id: "0292b4d8-516b-74c2-8455-2c2f05c4da99",
    sender: "Asisten",
    avatarUrl:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    content: "Sama-sama. Senang bisa membantu!",
    created_at: "1 Januari 2024",
    position: "left",
    rateable: true,
    regeneratable: true,
    reportable: true,
  },
];

export default function ChatPageLayout() {
  const [dummyMessages, setDummyMessages] =
    React.useState<ChatMessage[]>(MESSAGES);
  const params = useParams<PageParams>();
  const chatId = params.slug[0];
  const isLoading = false;
  // console.log(chatId);

  // const handleMessageRate = (messageId: string, rating: ChatMessageRating) => {
  //   setDummyMessages((messages) =>
  //     messages.map((message) =>
  //       message.id === messageId ? { ...message, rating } : message,
  //     ),
  //   );
  // };

  const {
    isPending: isConversationsPending,
    data: conversationsData,
    error: conversationsError,
  } = useQuery({
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

  const conversations = conversationsData?.data?.data;
  // console.log(conversations);

  const {
    isPending: isMessagesPending,
    data: messagesData,
    error: messagesError,
  } = useQuery({
    queryKey: ["message", chatId],
    queryFn: async () => {
      const res = await client.GET(`/conversations/${chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          query: {
            conversation_id: chatId,
          },
        },
      });

      return res;
    },
  });

  const messages: MessagesResponse[] = messagesData?.data?.data || [];
  console.log(messages);

  return (
    <>
      <Head>
        <title>bngky.</title>
      </Head>
      <ChatLayout
        conversations={conversations}
        isPending={isConversationsPending}
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
              messages={messages}
              onRate={() => {}}
              className="flex-1 overflow-y-auto"
              isLoading={isMessagesPending}
            />
            <ChatPromptInput
              isLoading={isLoading}
              className="relative z-10 w-full rounded-none bg-base-100 px-2 pb-5 pt-3 md:px-72 lg:mx-auto lg:pb-14"
            />
          </>
        )}
      </ChatLayout>
    </>
  );
}
