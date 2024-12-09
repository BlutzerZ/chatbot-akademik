"use client";
import Chat from "@/components/chat/Chat";
import { Message } from "@/components/chat/types";
import React, { useEffect, useState } from "react";
import ChatLayout from "./ChatLayout";
import { useParams } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatPromptInput from "@/components/chat/ChatPromptInput";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import client from "@/api/backend-client";
import { fetchConversations, fetchMessages } from "@/api/messagesApi";
import { useRouter } from "next/navigation";

type PageParams = {
  slug: string[];
};

// const MESSAGES: ChatMessage[] = [
//   {
//     id: "0192b4d8-516b-74c2-8455-2c2f05c4dd41",
//     sender: "Asisten",
//     avatarUrl:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     content: "Halo, ada yang bisa dibantu?",
//     created_at: "1 Januari 2024",
//     position: "left",
//     rateable: true,
//     regeneratable: true,
//     reportable: true,
//   },
//   {
//     id: "0192b4d8-d7a3-7ba9-ac30-4580109e3a7g",
//     sender: "Anda",
//     avatarUrl:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     content: "Apa itu Udinus?",
//     created_at: "1 Januari 2024",
//     position: "right",
//   },
//   {
//     id: "0192b4d8-516b-74c2-8455-2c2f05c4dd99",
//     sender: "Asisten",
//     avatarUrl:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     content:
//       "UDINUS (Universitas Dian Nuswantoro) adalah kampus di Semarang, Jawa Tengah.",
//     created_at: "1 Januari 2024",
//     position: "left",
//     rateable: true,
//     regeneratable: true,
//     reportable: true,
//   },
//   {
//     id: "0192b4d8-d7a3-7ba9-ac30-4580109e3a7f",
//     sender: "Anda",
//     avatarUrl:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     content: "Apa itu DNCC?",
//     created_at: "1 Januari 2024",
//     position: "right",
//   },
//   {
//     id: "0192b4d8-516b-74c2-8455-2c2f05c4ad42",
//     sender: "Asisten",
//     avatarUrl:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     content:
//       "DNCC (Dian Nuswantoro Computer Club) adalah sebuah UKM di UDINUS. DNCC memiliki berbagai divisi seperti Game, Data Analyst, Mobile, Jaringan, Multimedia, dan Web.",
//     created_at: "1 Januari 2024",
//     position: "left",
//     rateable: true,
//     regeneratable: true,
//     reportable: true,
//   },
//   {
//     id: "0192b4d8-516b-74c2-8455-2c2f05c4dd33",
//     sender: "Anda",
//     avatarUrl:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     content: "Oke terimakasih informasinya Bengky",
//     created_at: "1 Januari 2024",
//     position: "right",
//   },
//   {
//     id: "0292b4d8-516b-74c2-8455-2c2f05c4da99",
//     sender: "Asisten",
//     avatarUrl:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     content: "Sama-sama. Senang bisa membantu!",
//     created_at: "1 Januari 2024",
//     position: "left",
//     rateable: true,
//     regeneratable: true,
//     reportable: true,
//   },
// ];

export default function ChatContent() {
  // const [dummyMessages, setDummyMessages] = React.useState<ChatMessage[]>(MESSAGES);
  const params = useParams<PageParams>();
  const chatId = params.slug[0];
  const isLoading = false;
  const router = useRouter();

  //    FETCH CONVERSATIONS/HISTORY
  const {
    isPending: isConversationsPending,
    data: conversationsData,
    error: conversationsError,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      return fetchConversations();
    },
  });
  const conversations = conversationsData?.data?.data;
  // console.log("conversations: ", conversations);

  //    FETCH MESSAGES
  const {
    isPending: isMessagesPending,
    data: messagesData,
    error: messagesError,
  } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      if (!chatId) {
        throw new Error("chatId is undefined");
      }
      return fetchMessages(chatId);
    },
    enabled: chatId !== "new",
  });
  const [messages, setMessages] = useState<Message[]>([]); // Initialize with an empty array

  useEffect(() => {
    if (messagesData?.data) {
      setMessages(messagesData.data.data);
    }
  }, [messagesData]);

  //    HANDLE SEND/POST MESSAGE/PROMPT
  const handlePromptInput = async (prompt: string) => {
    if (!prompt.trim()) {
      // console.log("Prompt is empty")
      return;
    }

    try {
      const result = await client.POST(`/conversations/${chatId}/inquire`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          message: prompt,
        },
        params: {
          query: {
            conversation_id: chatId,
          },
        },
      });

      if (!result.error) {
        const newMessages = result.data.data as Message[];
        // console.log("HELLO WORLD");
        // console.log(newMessages);
        newMessages.map((newMessage: Message) => {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      } else {
        console.error("Error: ", prompt, result);
      }
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleNewConversation = async (prompt: string) => {
    if (!prompt.trim()) {
      return;
    }

    try {
      const result = await client.POST("/conversations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          message: prompt,
        },
      });
      // console.log(result.data.data[0].conversation_id)
      const redirect = result?.data?.data[0].conversation_id;
      router.push(`/chat/${redirect}`);
    } catch (error) {
      console.error("Error creating conversation: ", error);
    }
  };

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
          // <NewChat />
          // New Chat
          <div className="mb-10 flex h-screen flex-col items-center justify-center md:gap-10">
            <div className="h-full content-center px-5 md:h-fit md:w-1/2">
              <h1 className="text-center text-4xl font-semibold">
                Halo, apa yang bisa aku bantu? :)
              </h1>
            </div>
            <ChatPromptInput
              onPrompt={handleNewConversation}
              className="w-full border-0 px-2 pb-2 pt-3 md:w-1/2 md:px-0 md:pb-0 md:pt-0"
            />
          </div>
        ) : (
          <>
            <Chat
              messages={messages}
              onRate={() => {}}
              className="flex-1 overflow-y-auto"
              isMessagesLoading={isMessagesPending}
            />
            <ChatPromptInput
              onPrompt={handlePromptInput}
              isLoading={isLoading}
              className="relative z-10 w-full rounded-none bg-base-100 px-2 pb-5 pt-3 md:px-14 lg:mx-auto lg:w-3/5 lg:pb-14"
            />
          </>
        )}
      </ChatLayout>
    </>
  );
}
